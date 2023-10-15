using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Application.Refit;
using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.AgentHub;
using BikeShop.Acts.Domain.DTO.Scriban;
using BikeShop.Acts.Domain.Entities;
using BikeShop.Acts.Domain.Refit;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Refit;
using Scriban;

namespace BikeShop.Acts.Application.Services
{
    public class PrintService : IPrintService
    {
        private readonly IApplicationDbContext _context;
        private readonly IFileserviceClient _fileservice;
        private readonly IPaymentsClient _paymentsClient;
        private readonly IIdentityClient _identityClient;
        private readonly IProductClient _productClient;
        private readonly IServiceClient _serviceClient;

        public PrintService(IApplicationDbContext context, IFileserviceClient fileservice, IPaymentsClient paymentsClient, IIdentityClient identityClient, IProductClient productClient, IServiceClient serviceClient)
        {
            _context = context;
            _fileservice = fileservice;
            _paymentsClient = paymentsClient;
            _identityClient = identityClient;
            _productClient = productClient;
            _serviceClient = serviceClient;
        }

        public async Task<PrintQueue> AddQueue(int actId, string dataName, string? printSettings, int? prioriry, int agentId, IFormFile? imageFile)
        {
            if (prioriry == null) prioriry = 100;
            var storagedSettings = (await _context.PrintSettings.Where(n => n.AgentId == agentId).Where(n => n.Name == dataName).FirstOrDefaultAsync()).Settings;
            if(printSettings != null)
            {
                try
                {
                    var data = JsonConvert.DeserializeObject<PrinterSettings>(printSettings);
                    var actual = JsonConvert.DeserializeObject<PrinterSettings>(storagedSettings);
                    if (!string.IsNullOrWhiteSpace(data.printerName)) actual.printerName = data.printerName;
                    if (data.pageWight != 0) actual.pageWight = data.pageWight;
                    if (data.copies != 0) actual.copies = data.copies;
                    storagedSettings = JsonConvert.SerializeObject(actual);
                }
                catch (Exception)
                {
                }
               
            }

            string url = "";
            if(imageFile == null)
            {
                var dg = await _context.ActImages.Where(n => n.ActId == actId).Where(n => n.ActType == dataName).FirstOrDefaultAsync();
                if (dg == null) throw new Exception();
                url = dg.ImageURL;
            }
            else
            {
                var img = new ActImage { ActId= actId, ActType = dataName };
                await _context.ActImages.AddAsync(img);
                await _context.SaveChangesAsync(new CancellationToken());

                var stream = imageFile.OpenReadStream();
                var streamPart = new StreamPart(stream, imageFile.FileName, "image/png");

                url = await _fileservice.AddActImage(img.Id, streamPart);
                img.ImageURL = url;

                
            }

            var ent = new PrintQueue { AgentId = agentId, DataName = dataName, DataURL =  url, PrintSettings = storagedSettings, Priority = (int)prioriry};

            await _context.PrintQueues.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());

            return ent;
        }

        public async Task<PrintSettings> CreatePrinterSettings(int AgentId, string Name, string Settings)
        {
            var ent = new PrintSettings { Settings= Settings, Name = Name, AgentId = AgentId };
            await _context.PrintSettings.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }

        public async Task DeleteQueue(int QueueId)
        {
            _context.PrintQueues.Remove(await _context.PrintQueues.FindAsync(QueueId));
            await _context.SaveChangesAsync(new CancellationToken());
        }

        public async Task<List<PrintSettings>> GetAllPrintSettings()
        {
            return await _context.PrintSettings.ToListAsync();
        }

        public async Task<List<PrintQueue>> GetQueue(int AgentId)
        {
            return await _context.PrintQueues.Where(n=>n.AgentId == AgentId).ToListAsync();
        }

        public async Task<PrintSettings> UpdatePrinterSettings(int Id, int AgentId, string Name, string Settings)
        {
            var ent = await _context.PrintSettings.FindAsync(Id);
            if (ent == null) { throw new Exception(); }

            ent.Name = Name;
            ent.AgentId = AgentId;
            ent.Settings = Settings;

            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }

        public async Task<string> CreateActHTML<T>(T data)
        {
            PrintTamplate? tamplate = null;

            if (typeof(CashboxBillModel) == data.GetType())
            {
                tamplate = await _context.PrintTamplates.Where(n => n.Name == "CashboxBill").FirstOrDefaultAsync();
            }
            if (typeof(ProductStickerModel) == data.GetType())
            {
                tamplate = await _context.PrintTamplates.Where(n => n.Name == "ProductSticker").FirstOrDefaultAsync();
            }
            if (typeof(ServiceStickerModel) == data.GetType())
            {
                tamplate = await _context.PrintTamplates.Where(n => n.Name == "ServiceSticker").FirstOrDefaultAsync();
            }
            if (typeof(EncashmentModel) == data.GetType())
            {
                tamplate = await _context.PrintTamplates.Where(n => n.Name == "Encashment").FirstOrDefaultAsync();
            }
            if (typeof(ServiceIncomeActModel) == data.GetType())
            {
                tamplate = await _context.PrintTamplates.Where(n => n.Name == "ServiceIncomeAct").FirstOrDefaultAsync();
            }
            if (typeof(ServiceOutSmallActModel) == data.GetType())
            {
                tamplate = await _context.PrintTamplates.Where(n => n.Name == "ServiceOutSmallAct").FirstOrDefaultAsync();
            }
            if (typeof(ServiceOutFullActModel) == data.GetType())
            {
                tamplate = await _context.PrintTamplates.Where(n => n.Name == "ServiceOutFullAct").FirstOrDefaultAsync();
            }

            string tamplateString = "<h1>Tamplate not found<h1>";

            if(tamplate != null)
            {
                tamplateString = tamplate.ScribanTamplate;
            }

            return await Template.Parse(tamplateString).RenderAsync(new TypedContext(data));
        }

        public async Task<PrintDTO> PrintBill(StartPrintDTO dto)
        {
            var bill = await _paymentsClient.GetBill(dto.DataId);
            var currency = await _paymentsClient.GetCurrency(bill.bill.CurrencyId);
            //var users = new Dictionary<string, UserDTO>();
            var users = await _identityClient.GetDictionary(new List<string> { bill.bill.ClientId.ToString(), bill.bill.UserId.ToString() });
            var model = new CashboxBillModel();
            model.Id = bill.bill.Id.ToString();
            model.Date = bill.bill.CreatedAt.ToString("dd-MM-yyyy");
            model.Products = bill.products.Select(n => new CashboxBillModelProduct { Name = n.Name, Price = n.Price.ToString("0.00"), Quantity = n.Quantity.ToString("0.##"), QuanUnit = n.QuantityUnitName, Total = n.Total.ToString("0.00") }).ToList();
            model.CurSymbol = currency.Symbol;
            
            model.Manager = "";

            if(users.TryGetValue(bill.bill.UserId.ToString(), out var manager))
            {
                model.Manager = manager.lastName + " " + manager.firstName+ " " +manager.patronymic;
            }
            

            model.Client = "";
            if (users.TryGetValue(bill.bill.UserId.ToString(), out var client))
            {
                model.Client = client.lastName + " " + client.firstName + " " + client.patronymic;
            }

            model.WithoutDisc = (bill.bill.Total-bill.bill.Discount).ToString("0.00");
            model.Disc = bill.bill.Discount.ToString("0.00");
            model.Total = bill.bill.Total.ToString("0.00");

            var tamplate = await CreateActHTML(model);

            var storagedSettings = (await _context.PrintSettings.Where(n => n.AgentId == dto.AgentId).Where(n => n.Name == "Bill").FirstOrDefaultAsync()).Settings;

            var actual = JsonConvert.DeserializeObject<PrinterSettings>(storagedSettings);
            if (dto.Copies != 0 && dto.Copies != null) actual.copies = (int)dto.Copies;

            return new PrintDTO { HTML = tamplate, PrintSettings = actual, AgentId = dto.AgentId};
        }

        public async Task<PrintDTO> PrintProductSticker(StartPrintDTO dto)
        {
            var product = (await _productClient.GetProductsByIdsArray(new List<int> { dto.DataId })).FirstOrDefault();

            var currency = await _paymentsClient.GetCurrency(dto.CurrencyId ?? 1);

            var tamplate = await CreateActHTML(new ProductStickerModel { CatalogKey = product.CatalogKey, Id = product.Id, CurSymbol = currency.Symbol, Name = product.Name, Price = (product.RetailPrice*currency.Coefficient).ToString("0.00") });

            var storagedSettings = (await _context.PrintSettings.Where(n => n.AgentId == dto.AgentId).Where(n => n.Name == "ProductSticker").FirstOrDefaultAsync()).Settings;

            var actual = JsonConvert.DeserializeObject<PrinterSettings>(storagedSettings);
            if (dto.Copies != 0 && dto.Copies != null) actual.copies = (int)dto.Copies;

            return new PrintDTO { HTML = tamplate, PrintSettings = actual, AgentId = dto.AgentId };
        }

        public async Task<PrintDTO> PrintServiceSticker(StartPrintDTO dto)
        {
            var s = await _serviceClient.GetById(dto.DataId);

            var tamplate = await CreateActHTML(new ServiceStickerModel {Id = s.service.Id, Client = s.service.ClientFIO, Phone = s.service.ClientPhone});

            var storagedSettings = (await _context.PrintSettings.Where(n => n.AgentId == dto.AgentId).Where(n => n.Name == "WorkshopSticker").FirstOrDefaultAsync()).Settings;

            var actual = JsonConvert.DeserializeObject<PrinterSettings>(storagedSettings);
            if (dto.Copies != 0 && dto.Copies != null) actual.copies = (int)dto.Copies;

            return new PrintDTO { HTML = tamplate, PrintSettings = actual, AgentId = dto.AgentId };
        }

        public async Task<PrintDTO> PrintEncashment(StartPrintDTO dto)
        {
            var enc = await _context.Encashments.FindAsync(dto.DataId);
            var cur = await _paymentsClient.GetCurrency(dto.CurrencyId ?? 1);
            var tamplate = await CreateActHTML(new EncashmentModel { Id = enc.Id, Date = enc.CreatedAt.ToString("dd-MM-yyyy"), Cash = (enc.Cash*cur.Coefficient).ToString("0.00"), Left = (enc.CashRemain*cur.Coefficient).ToString("0.00"), Terminal = (enc.Card * cur.Coefficient).ToString("0.00"), CurSymbol = cur.Symbol});

            var storagedSettings = (await _context.PrintSettings.Where(n => n.AgentId == dto.AgentId).Where(n => n.Name == "Encashment").FirstOrDefaultAsync()).Settings;

            var actual = JsonConvert.DeserializeObject<PrinterSettings>(storagedSettings);
            if (dto.Copies != 0 && dto.Copies != null) actual.copies = (int)dto.Copies;

            return new PrintDTO { HTML = tamplate, PrintSettings = actual, AgentId = dto.AgentId };
        }

        public async Task<PrintDTO> PrintServiceIncomeAct(StartPrintDTO dto)
        {
            var s = await _serviceClient.GetById(dto.DataId);

            var tamplate = await CreateActHTML(new ServiceIncomeActModel { Id = s.service.Id, ClientFIO = s.service.ClientFIO, ClientPhone = s.service.ClientPhone, Bike = s.service.Name, Description = s.service.ClientDescription, Date = s.service.CreatedAt.ToString("dd-MM-yyyy"), ManagerFIO = s.service.UserFIO });

            var storagedSettings = (await _context.PrintSettings.Where(n => n.AgentId == dto.AgentId).Where(n => n.Name == "WorkshopIn").FirstOrDefaultAsync()).Settings;

            var actual = JsonConvert.DeserializeObject<PrinterSettings>(storagedSettings);
            if (dto.Copies != 0 && dto.Copies != null) actual.copies = (int)dto.Copies;

            return new PrintDTO { HTML = tamplate, PrintSettings = actual, AgentId = dto.AgentId };
        }

        public async Task<PrintDTO> PrintServiceOutcomeShort(StartPrintDTO dto)
        {
            var s = await _serviceClient.GetById(dto.DataId);

            var tamplate = await CreateActHTML(new ServiceOutSmallActModel { Id = s.service.Id, ClientFIO = s.service.ClientFIO, ClientPhone = s.service.ClientPhone, Bike = s.service.Name, Date = s.service.CreatedAt.ToString("dd-MM-yyyy"), ManagerFIO = s.service.UserFIO });

            var storagedSettings = (await _context.PrintSettings.Where(n => n.AgentId == dto.AgentId).Where(n => n.Name == "WorkshopOutSmall").FirstOrDefaultAsync()).Settings;

            var actual = JsonConvert.DeserializeObject<PrinterSettings>(storagedSettings);
            if (dto.Copies != 0 && dto.Copies != null) actual.copies = (int)dto.Copies;

            return new PrintDTO { HTML = tamplate, PrintSettings = actual, AgentId = dto.AgentId };
        }

        public async Task<PrintDTO> PrintServiceOutcomeFull(StartPrintDTO dto)
        {
            var s = await _serviceClient.GetById(dto.DataId);
            var c = await _paymentsClient.GetCurrency(dto.CurrencyId ?? 1);

            var model = new ServiceOutFullActModel
            {
                CurSymbol = c.Symbol,
                Id = s.service.Id,
                ClientFIO = s.service.ClientFIO,
                ClientPhone = s.service.ClientPhone,
                Bike = s.service.Name,
                Date = s.service.CreatedAt.ToString("dd-MM-yyyy"),
                ManagerFIO = s.service.UserFIO,
                Products = s.products.Select(n => new ServiceProductModel { Name = n.Name, Price = (n.Price * c.Coefficient).ToString("0.00"), Quantity = n.Quantity.ToString("0.##"), QuanUnit = n.QuantityUnitName, Total = (n.Total * c.Coefficient).ToString("0.00") }).ToList(),
                Works = s.works.Select(n=>new ServiceWorkModel { Name = n.Name, Price = (n.Price * c.Coefficient).ToString("0.00"), Quantity = n.Quantity.ToString("0.##"), Total = (n.Total * c.Coefficient).ToString("0.00") }).ToList(),
                DiscWorks = (s.service.DiscountWork * c.Coefficient).ToString("0.00"),
                DiscProducts = (s.service.DiscountProduct * c.Coefficient).ToString("0.00"),
                TotalProducts = (s.service.TotalProduct * c.Coefficient).ToString("0.00"),
                TotalWorks = (s.service.TotalWork * c.Coefficient).ToString("0.00"),
                TotalService = (s.service.Total * c.Coefficient).ToString("0.00"),
                WithoutDiscWorks = ((s.service.TotalWork + s.service.DiscountWork) * c.Coefficient).ToString("0.00"),
                WithoutDiscProducts = ((s.service.TotalWork + s.service.DiscountWork) * c.Coefficient).ToString("0.00")
            };

            var tamplate = await CreateActHTML(model);

            var storagedSettings = (await _context.PrintSettings.Where(n => n.AgentId == dto.AgentId).Where(n => n.Name == "WorkshopOut").FirstOrDefaultAsync()).Settings;

            var actual = JsonConvert.DeserializeObject<PrinterSettings>(storagedSettings);
            if (dto.Copies != 0 && dto.Copies != null) actual.copies = (int)dto.Copies;

            return new PrintDTO { HTML = tamplate, PrintSettings = actual, AgentId = dto.AgentId };
        }
    }
}
