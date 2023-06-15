using BikeShop.Acts.Application.Refit;
using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Application.Refit;
using BikeShop.Payments.Domain.DTO.Refit.Checkbox;
using BikeShop.Payments.Domain.DTO.Requests;
using BikeShop.Payments.Domain.DTO.Responses;
using BikeShop.Payments.Domain.Entities;
using BikeShop.Payments.Domain.Enumerables;
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

        public FinancialInteractionService(ICheckboxClient checkbox, IApplicationDbContext context, IPaymentService paymentService, IProductClient productClient, IShopClient shopClient)
        {
            _checkbox = checkbox;
            _context = context;
            _paymentService = paymentService;
            _productClient = productClient;
            _shopClient = shopClient;
        }

        public async Task<List<BillWithProducts>> GetBillsByShop(int ShopId, int Take)
        {
            var bills = await _context.Bills.Where(n=>n.ShopId == ShopId).Take(Take).ToListAsync();
            var prods = await _context.BillProducts.Where(n => bills.Select(m => m.Id).Contains(n.BillId)).ToListAsync();
            return bills.Select(n => new BillWithProducts { bill = n, products = prods.Where(m => m.BillId == n.Id).ToList() }).ToList();
        }

        public async Task<List<BillWithProducts>> GetBillsByUser(Guid UserId, DateTime Start, DateTime Finish)
        {
            var bills = await _context.Bills.Where(n => n.Enabled == true).Where(n => n.UserId == UserId).Where(n => n.CreatedAt > Start).Where(n => n.CreatedAt < Finish).ToListAsync();
            var prods = await _context.BillProducts.Where(n => n.Enabled == true).Where(n => bills.Select(m => m.Id).Contains(n.BillId)).ToListAsync();
            return bills.Select(n => new BillWithProducts { bill = n, products = prods.Where(m => m.BillId == n.Id).ToList() }).ToList();
        }

        public async Task<BillWithProducts> NewBill(NewBillDTO dto)
        {
            var currencies = await _context.Currencies.ToListAsync();
            var currency = currencies.Where(n => n.Id == dto.CurrencyId).FirstOrDefault();
            var products = new List<BillProduct>();
            foreach (var product in dto.Products)
            {
                var prc = product.Price;
                if (dto.CurrencyId != product.CurrencyId)
                {
                    var inbase = product.Price * (1 / currencies.Where(n => n.Id == product.CurrencyId).FirstOrDefault().Coefficient);
                    prc = inbase * currency.Coefficient;
                }
                products.Add(new BillProduct
                {
                    CatalogKey = product.CatalogKey,
                    CurrencySymbol = currency.Symbol,
                    Description = product.Description,
                    Discount = product.Discount,
                    Name = product.Name,
                    CurrencyId = dto.CurrencyId,
                    ProductId = product.ProductId,

                    Price = prc,
                    Quantity = product.Quantity,
                    QuantityUnitName = product.QuantityUnitName,
                    SerialNumber = product.SerialNumber,
                    Total = product.Quantity * product.Price - product.Discount
                }); ;
            }

            var price = products.Select(n => n.Price * n.Quantity).Sum();
            var discount = products.Sum(n => n.Discount);

            var bill = new Bill {
                ClientId = dto.ClientId,
                CurrencyId = dto.CurrencyId,
                Description = dto.Description,
                ShopId = dto.ShopId,
                UserId = dto.UserId,
                Price = price,
                Discount = discount,
                Total = price - discount,
            };

            await _context.Bills.AddAsync(bill);
            await _context.SaveChangesAsync(new CancellationToken());

            products.ForEach(n => n.BillId = bill.Id);
            await _context.BillProducts.AddRangeAsync(products);
            await _paymentService.NewPayment(new CreatePayment { ShopId = dto.ShopId, UserId = dto.UserId, Card = dto.Card, Cash = dto.Cash, ClientId = dto.ClientId, BankCount = dto.BankCount, CurrencyId = dto.CurrencyId, PersonalBalance = dto.PersonalBalance, Target = PaymentTarget.Cashbox, TargetId = bill.Id });
            await _productClient.AddProductsToStorage(products.Select(n => new Acts.Domain.Refit.ProductQuantitySmplDTO { ProductId = n.ProductId, Quantity = n.Quantity * -1 }).ToList(), await _shopClient.GetStorageId(dto.ShopId), "Bill", bill.Id);
            await _context.SaveChangesAsync(new CancellationToken());

            if (dto.IsFiscal == null || dto.IsFiscal == true)
            {
                var goods = dto.Products.Select(n => new GoodModel { quantity = (int)(n.Quantity * 1000), good = new Good { code = n.ProductId.ToString(), name = n.Name, price = (int)(n.Price * 100) } }).ToList();
                var payment = new Pymnt { value = goods.Select(n => n.quantity / 1000 * n.good.price).Sum(), label = "Pay", type = "CASHLESS" };
                var receipt = new Receipt { payments = new List<Pymnt> { payment }, goods = goods, id = bill.UUID };

                var settings = await _context.CheckboxSettings.FirstOrDefaultAsync();

                var check = await _checkbox.CheckSignature(settings.BearerToken);

                if (check.StatusCode == HttpStatusCode.Unauthorized || check.StatusCode == HttpStatusCode.Forbidden) settings.BearerToken = await LoginToCheckbox();
                else if (check.StatusCode != HttpStatusCode.OK) throw new Exception();

                SellResponse res;
                try
                {
                    res = await _checkbox.Sell(receipt, settings.BearerToken);
                }
                catch (Exception e)
                {
                    await _checkbox.CreateShift(settings.Key, settings.BearerToken);
                    res = await _checkbox.Sell(receipt, settings.BearerToken);
                }
                
                var qr = await _checkbox.GerQRCode(res.id, settings.BearerToken);
                while (qr.StatusCode == HttpStatusCode.FailedDependency)
                {
                    await Task.Delay(1000);
                    qr = await _checkbox.GerQRCode(res.id, settings.BearerToken);
                }
                bill.FiscalId = res.id;
                bill.QRCode = Convert.ToBase64String(await qr.Content.ReadAsByteArrayAsync());
                await _context.SaveChangesAsync(new CancellationToken());
            }

            return new BillWithProducts { bill = bill, products = products};
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
    }
}
