using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Application.Refit;
using BikeShop.Acts.Domain;
using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.Requests.Inventarization;
using BikeShop.Acts.Domain.Entities;
using BikeShop.Acts.Domain.Refit;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Service.Application.RefitClients;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Services
{
    public class InventarizationService : IInventarizationService
    {
        private readonly IApplicationDbContext _context;
        private readonly IProductClient _productClient;
        private readonly IShopClient _shopClient;

        public InventarizationService(IApplicationDbContext context, IProductClient productClient, IShopClient shopClient)
        {
            _context = context;
            _productClient = productClient;
            _shopClient = shopClient;
        }

        public async Task<InventarizationLackWithProducts> CloseAct(int ActId, Guid UserId)
        {
            var inv = await _context.Inventarizations.FindAsync(ActId);
            if (inv == null || inv.Status == "Closed") throw new Exception();
// || inv.Status == "Closed"
            inv.Status = "Closed";
            inv.UpdatedAt = DateTime.Now;
            inv.UserUpdatedId= UserId;

            var lack = new InventarizationLack {  InventarizationId = ActId, ShopId = inv.ShopId, UserCreatedId = UserId, UserUpdatedId = UserId, Description = $"Lack based on Inventarization{inv.Id}" };
            
            await _context.InventarizationLacks.AddAsync(lack);
            await _context.SaveChangesAsync(new CancellationToken());

            var invProds = await _context.InventarizationProducts.Where(n=>n.InventariazationId ==ActId).ToListAsync();
            var storage = await _productClient.GetByStorage(await _shopClient.GetStorageId(inv.ShopId));

            var notFound = storage.AvailableProducts;

            var LackProds = new List<InventarizationLackProduct>();

            foreach (var prod in invProds)
            {
                var prodQuant = storage.AvailableProducts.Where(n => n.Product.Id == prod.ProductId).FirstOrDefault();
                if(prodQuant != null)
                {
                    prodQuant.Quantity -= prod.Quantity;
                    if (prodQuant.Quantity != 0)
                    {
                        var lp = new InventarizationLackProduct();
                        lp.InventariazationLackId = lack.Id;
                        lp.ProductId = prod.ProductId;
                        lp.Quantity = prodQuant.Quantity * -1;
                        lp.QuantityUnitName = prodQuant.QuantityUnit.Name;
                        lp.RetailPrice = prodQuant.Product.RetailPrice;
                        lp.IncomePrice = prodQuant.Product.IncomePrice;
                        lp.Barcode = prodQuant.Product.Barcode;
                        lp.ManufBarcode = prodQuant.Product.ManufacturerBarcode;
                        lp.CatalogKey = prodQuant.Product.CatalogKey;   
                        lp.DealerPrice = prodQuant.Product.DealerPrice;
                        lp.DealerTotal = lp.DealerPrice * lp.Quantity;
                        lp.IncomeTotal = lp.IncomePrice * lp.Quantity;
                        lp.RetailTotal = lp.RetailPrice * lp.Quantity;
                        lp.Description = prod.Description;
                        lp.Name = prodQuant.Product.Name;
                        lp.ManufBarcode = "";

                        LackProds.Add(lp);
                        
                    }
                }
                
                notFound.Remove(prodQuant);
            }


            foreach (var prod in notFound)
            {
                var lp = new InventarizationLackProduct();
                lp.InventariazationLackId = lack.Id;
                lp.ProductId = prod.Product.Id;
                lp.Quantity = prod.Quantity;
                lp.QuantityUnitName = "";
                lp.RetailPrice = prod.Product.RetailPrice;
                lp.IncomePrice = prod.Product.IncomePrice;
                lp.Barcode = prod.Product.Barcode;
                lp.Name = prod.Product.Name;
                lp.ManufBarcode = prod.Product.ManufacturerBarcode;
                lp.CatalogKey = prod.Product.CatalogKey;
                lp.DealerPrice = prod.Product.DealerPrice;
                lp.DealerTotal = lp.DealerPrice * lp.Quantity;
                lp.IncomeTotal = lp.IncomePrice * lp.Quantity;
                lp.RetailTotal = lp.RetailPrice * lp.Quantity;
                lp.Description = "";
                lp.ManufBarcode = "";


                LackProds.Add(lp);
            }


            await _context.InventarizationLackProducts.AddRangeAsync(LackProds);
            await _context.SaveChangesAsync(new CancellationToken());

            return new InventarizationLackWithProducts { InventarizationLack = lack, Products = LackProds };
        }

        public async Task<InventarizationWithProducts> Create(int ShopId, Guid UserId)
        {
            var ent = new Inventarization { ShopId = ShopId, Status = "InWork", UserCreatedId = UserId, UserUpdatedId = UserId, Description = "" };
            await _context.Inventarizations.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());

            return new InventarizationWithProducts { Inventarization = ent, Products = new List<InventarizationProduct>() };
        }

        public async Task<List<InventarizationWithProducts>> GetByShop(int ShopId, int Take)
        {
            var invs = await _context.Inventarizations.Where(n => n.ShopId == ShopId).Take(Take).ToListAsync();

            var products = await _context.InventarizationProducts.Where(n => invs.Select(n => n.Id).Contains(n.InventariazationId)).ToListAsync();

            return invs.Select(n=>new InventarizationWithProducts { Inventarization = n,Products = products.Where(m=>m.InventariazationId == n.Id).ToList() }).ToList();
        }

        public async Task<List<InventarizationLackWithProducts>> GetLackByShop(int ShopId)
        {
            var lack = await _context.InventarizationLacks.Where(n=>n.ShopId == ShopId).ToListAsync();
            var prods = await _context.InventarizationLackProducts.Where(n=>lack.Select(m=>m.Id).Contains(n.InventariazationLackId)).ToListAsync();
            return lack.Select(n=>new InventarizationLackWithProducts { InventarizationLack = n, Products = prods.Where(n=>n.InventariazationLackId == n.Id).ToList() }).ToList();
        }

        public async Task<InventarizationWithProducts> Update(UpdateInventarizationDTO dto)
        {
            var inv = await _context.Inventarizations.FindAsync(dto.Inventarization.Id);

            if (inv == null) throw new Exception();

            inv.Description = dto.Inventarization.Description;
            inv.UserUpdatedId = dto.Inventarization.User;
            inv.UpdatedAt = DateTime.Now;

            var ExProds = await _context.InventarizationProducts.Where(n => n.InventariazationId == dto.Inventarization.Id).ToDictionaryAsync(n=>n.Id, n=>n);
            var newProds = new List<InventarizationProduct>();
            var actualProds = new List<InventarizationProduct>();

            foreach (var item in dto.Products)
            {
                if(ExProds.ContainsKey(item.Id)){
                    var ent = ExProds[item.Id];

                    if(ent.Quantity != item.Quantity) ent.UserUpdated = dto.Inventarization.User;

                    ent.ProductId = item.ProductId;
                    ent.Name = item.Name;
                    ent.Description = item.Description;
                    ent.CatalogKey = item.CatalogKey;
                    ent.Barcode = item.Barcode; 
                    ent.ManufBarcode = item.ManufBarcode;
                    ent.DealerPrice = item.DealerPrice;
                    ent.RetailPrice = item.RetailPrice;
                    ent.IncomePrice = item.IncomePrice;
                    ent.QuantityUnitName = item.QuantityUnitName;
                    ent.Quantity = item.Quantity;

                    ent.UpdatedAt= DateTime.Now;

                    ent.DealerTotal = ent.DealerPrice * ent.Quantity;
                    ent.RetailTotal = ent.RetailPrice * ent.Quantity;
                    ent.IncomeTotal = ent.IncomePrice * ent.Quantity;

                    ExProds.Remove(item.Id);
                    actualProds.Add(ent);
                }
                else
                {
                    var ent = new InventarizationProduct();

                    ent.InventariazationId = dto.Inventarization.Id;
                    ent.ProductId = item.ProductId;
                    ent.Name = item.Name;
                    ent.Description = item.Description;
                    ent.CatalogKey = item.CatalogKey;
                    ent.Barcode = item.Barcode;
                    ent.ManufBarcode = item.ManufBarcode;
                    ent.DealerPrice = item.DealerPrice;
                    ent.RetailPrice = item.RetailPrice;
                    ent.IncomePrice = item.IncomePrice;
                    ent.QuantityUnitName = item.QuantityUnitName;
                    ent.Quantity = item.Quantity;

                    ent.UserCreated = dto.Inventarization.User;
                    ent.UserUpdated = dto.Inventarization.User;

                    ent.DealerTotal = ent.DealerPrice * ent.Quantity;
                    ent.RetailTotal = ent.RetailPrice * ent.Quantity;
                    ent.IncomeTotal = ent.IncomePrice * ent.Quantity;

                    newProds.Add(ent);
                    actualProds.Add(ent);
                }
            }

            _context.InventarizationProducts.RemoveRange(ExProds.Values);
            await _context.InventarizationProducts.AddRangeAsync(newProds);
            await _context.SaveChangesAsync(new CancellationToken());

            return new InventarizationWithProducts { Inventarization = inv, Products = actualProds };
        }
    }
}
