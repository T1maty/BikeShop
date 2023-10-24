using BikeShop.Acts.Application.Refit;
using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Application.Refit;
using BikeShop.Payments.Domain.DTO.Refit.Checkbox;
using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.DTO.Requests.Payment;
using BikeShop.Payments.Domain.DTO.Responses;
using BikeShop.Payments.Domain.Entities;
using BikeShop.Payments.Domain.Enumerables.PaymentEnums;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Service.Application.RefitClients;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace BikeShop.Payments.Application.Services
{
    public class FinancialInteractionService : IFinancialInteractionService
    {
        private readonly ICheckboxClient _checkbox;
        private readonly IApplicationDbContext _context;
        private readonly IPaymentService _paymentService;
        private readonly IProductClient _productClient;
        private readonly IShopClient _shopClient;
        private readonly IIdentityClient _identityClient;

        public FinancialInteractionService(ICheckboxClient checkbox, IApplicationDbContext context, IPaymentService paymentService, IProductClient productClient, IShopClient shopClient, IIdentityClient identityClient)
        {
            _checkbox = checkbox;
            _context = context;
            _paymentService = paymentService;
            _productClient = productClient;
            _shopClient = shopClient;
            _identityClient = identityClient;
        }

        public async Task<List<BillWithProducts>> GetBillsByShop(int ShopId, int Take)
        {
            var bills = await _context.Bills.Where(n=>n.ShopId == ShopId).Take(Take).ToListAsync();
            var prods = await _context.BillProducts.Where(n => bills.Select(m => m.Id).Contains(n.BillId)).ToListAsync();
            var payments = await _context.Payments.Where(n => bills.Select(h => h.PaymentId).Contains(n.Id)).ToDictionaryAsync(n=>n.Id, n=>n);
            return bills.Select(n => new BillWithProducts { bill = n, products = prods.Where(m => m.BillId == n.Id).ToList(), Payment = payments[n.PaymentId] }).ToList();
        }

        public async Task<List<BillWithProducts>> GetBillsByUser(Guid? UserId, DateTime Start, DateTime Finish)
        {
            var bills = _context.Bills.Where(n => n.Enabled == true).Where(n => n.CreatedAt > Start).Where(n => n.CreatedAt < Finish);
            if (UserId != null) bills = bills.Where(n => n.UserId == UserId);
            var prods = await _context.BillProducts.Where(n => n.Enabled == true).Where(n => bills.Select(m => m.Id).Contains(n.BillId)).ToListAsync();
            var buf = await bills.ToListAsync();
            return buf.Select(n => new BillWithProducts { bill = n, products = prods.Where(m => m.BillId == n.Id).ToList() }).ToList();
        }

        public async Task<BillWithProducts> NewBill(NewBillDTO dto)
        {
            var currency = await _context.Currencies.FindAsync(dto.Payment.CurrencyId);
            var Prods = (await _productClient.GetProductsByIdsArray(dto.Products.Select(n=>n.ProductId).ToList())).ToDictionary(n=>n.Id,n=>n);
            var products = new List<BillProduct>();
            
            foreach (var product in dto.Products)
            {
                var P = Prods[product.ProductId];
                products.Add(new BillProduct
                {
                    CatalogKey = P.CatalogKey,
                    Description = product.Description,
                    Discount = 0,
                    Name = P.Name,
                    ProductId = product.ProductId,

                    Price = P.RetailPrice,
                    Quantity = product.Quantity,
                    QuantityUnitName = P.QuantityUnitName,
                    SerialNumber = "",
                    Total = product.Quantity * P.RetailPrice - 0,//Disc
                    
                    DiscountInCurrency= 0, 
                    PriceInCurrency= P.RetailPrice * currency.Coefficient, 
                    TotalInCurrency =product.Quantity * P.RetailPrice * currency.Coefficient - 0//Disc
                }); ;
            }

            var price = products.Select(n => n.Price * n.Quantity).Sum();
            var discount = products.Sum(n => n.Discount);
            var total = price - discount;

            var bill = new Bill {
                ClientId = dto.ClientId,
                CurrencyId = currency.Id,
                Description = dto.Description,
                ShopId = dto.ShopId,
                UserId = dto.UserId,
                CurrencyName = currency.Name, 
                CurrencySymbol = currency.Symbol,
                FiscalId = null,

                Price = price,
                PriceInCurrency = price * currency.Coefficient,

                DiscountId = 0,

                DiscountBill = 0,
                DiscountBillInCurrency = 0,

                DiscountProducts = 0,
                DiscountProductsInCurrency = 0,

                TotalDiscountInCurrency = 0, 
                TotalDiscount = 0,

                TotalInCurrency = total * currency.Coefficient,
                Total = price - discount,
            };

            await _context.Bills.AddAsync(bill);
            await _context.SaveChangesAsync(new CancellationToken());

            products.ForEach(n => n.BillId = bill.Id);
            await _context.BillProducts.AddRangeAsync(products);
            var payment = await _paymentService.NewPayment(new CreatePayment { ShopId = dto.ShopId, UserId = dto.UserId, ClientId = dto.ClientId,  Target = PaymentTarget.Cashbox.ToString(), TargetId = bill.Id,
             Payment = dto.Payment, Source = PaymentSource.Shop.ToString()});
            bill.PaymentId = payment.Id;
            await _productClient.AddProductsToStorage(products.Select(n => new Acts.Domain.Refit.ProductQuantitySmplDTO { ProductId = n.ProductId, Quantity = n.Quantity * -1 }).ToList(), await _shopClient.GetStorageId(dto.ShopId), "Bill", bill.Id);
            await _context.SaveChangesAsync(new CancellationToken());

            if (dto.Payment.IsFiscal == true)
            {
                var goods = products.Select(n => new GoodModel { quantity = (int)(n.Quantity * 1000), good = new Good { code = n.ProductId.ToString(), name = n.Name, price = (int)(n.Price * 100 * currency.Coefficient) } }).ToList();
                var res = await CheckboxFiscalize(goods, dto.Payment.PaymentType == PaymentType.Cash.ToString() ? true : false, bill.UUID);
                bill.FiscalId = res.id;
                //bill.QRCode = Convert.ToBase64String(await qr.Content.ReadAsByteArrayAsync());
            }

            return new BillWithProducts { bill = bill, products = products};
        }

        private async Task<SellResponse> CheckboxFiscalize(List<GoodModel> goods, bool isCash, Guid UUID)
        {
            string type = "CASHLESS";
            if (isCash) type = "CASH";
            var payment = new Pymnt { value = goods.Select(n => (int)(n.quantity / 1000 * n.good.price)).Sum(), label = "Pay", type = type };
            var receipt = new Receipt { payments = new List<Pymnt> { payment }, goods = goods, id = UUID };

            var settings = await _context.CheckboxSettings.FirstOrDefaultAsync();

            var check = await _checkbox.CheckSignature(settings.BearerToken);

            if (check.StatusCode == HttpStatusCode.Unauthorized || check.StatusCode == HttpStatusCode.Forbidden) settings.BearerToken = await LoginToCheckbox();
            else if (check.StatusCode != HttpStatusCode.OK) throw new Exception();

            SellResponse res;
            try
            {
                res = await _checkbox.Sell(receipt, settings.BearerToken);
                return res;
            }
            catch (Exception e)
            {
                await _checkbox.CreateShift(settings.Key, settings.BearerToken);
                res = await _checkbox.Sell(receipt, settings.BearerToken);
                return res;

            }

            /*
            var qr = await _checkbox.GerQRCode(res.id, settings.BearerToken);
            while (qr.StatusCode == HttpStatusCode.FailedDependency)
            {
                await Task.Delay(1000);
                qr = await _checkbox.GerQRCode(res.id, settings.BearerToken);
            }
            */
        }

        public async Task<string> LoginToCheckbox()
        {
            var loginData = await _context.CheckboxSettings.FirstOrDefaultAsync();

            var res = await _checkbox.SigninPinCode(new SignInModel { pin_code = loginData.PIN }, loginData.Key);
            var token = "Bearer " + res.access_token;
            loginData.BearerToken = token;
            return token;
        }

        public async Task<byte[]> Test()
        {
            //var rest = await _checkbox.Sell("{\r\n   \"goods\":[\r\n      {\r\n         \"good\":{\r\n            \"code\":\"1\",\r\n            \"name\":\"Гречаний мед (400г)\",\r\n            \"price\":16000,\r\n            \"tax\":[8]\r\n         },\r\n         \"quantity\":2000,\r\n         \"is_return\":false\r\n      }\r\n   ],\r\n   \"payments\":[\r\n      {\r\n         \"type\":\"CASHLESS\",\r\n         \"label\":\"Карткою на сайті\",\r\n         \"value\":32000\r\n      }\r\n   ]\r\n}", 
            //    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiQVBJIiwianRpIjoiYmY4MWNhNzQtZmY5OS00ZWYwLWE0ZWMtMDBjNWRlZDk4ZTMyIiwic3ViIjoiNTliMWI4OTQtYTY4Mi00MDBiLTk3ZWEtM2EyYmQ1NTllMDY2IiwibmJmIjoxNjg2NjUyNDI1LCJpYXQiOjE2ODY2NTI0MjV9.HSBV0_cS6z1l7aQ4MzyH2eU_CqrRzgJJ9xAv56O1HvE");
            //var resp = await _checkbox.SigninPinCode(new Domain.DTO.Refit.Checkbox.SignInModel {  pin_code = "7409773506" }, "test50d956f736169332349faa83");

            var res = await _checkbox.GerQRCode(new Guid("89a380a7-fbfb-435d-ab85-e8ad0b811ac5"), "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiQVBJIiwianRpIjoiYmY4MWNhNzQtZmY5OS00ZWYwLWE0ZWMtMDBjNWRlZDk4ZTMyIiwic3ViIjoiNTliMWI4OTQtYTY4Mi00MDBiLTk3ZWEtM2EyYmQ1NTllMDY2IiwibmJmIjoxNjg2NjUyNDI1LCJpYXQiOjE2ODY2NTI0MjV9.HSBV0_cS6z1l7aQ4MzyH2eU_CqrRzgJJ9xAv56O1HvE");
            var data = await res.Content.ReadAsByteArrayAsync();
            return data;
        }

        public async Task<Payment> ReplenishUserBalance(AddPaymentDTO dto, Guid ClientId, PaymentSource Source, Guid? UserId, int ShopId =0, int TargetId = 0)
        {
            var p = new CreatePayment {
             ClientId = ClientId, Payment = dto, Source = Source.ToString(), ShopId = ShopId, Target = PaymentTarget.ReplenishBalance.ToString(), TargetId = TargetId, UserId = UserId
            };
            await _identityClient.EditBalance(ClientId, dto.Amount, true);
            return await _paymentService.NewPayment(p);
        }

        public async Task<BillWithProducts> GetBill(int BillId)
        {
            var bill = await _context.Bills.FindAsync(BillId);
            var billProduct = await _context.BillProducts.Where(n => n.BillId == BillId).ToListAsync();
            var payment = await _context.Payments.FindAsync(bill.PaymentId);
            return new BillWithProducts { bill = bill, products = billProduct, Payment = payment };
        }
    }
}
