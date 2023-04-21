using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.Requests.Inventarization;
using BikeShop.Acts.Domain.Entities;
using BikeShop.Products.Application.Interfaces;
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

        public InventarizationService(IApplicationDbContext context)
        {
            _context = context;
        }

        public Task<InventarizationWithProducts> CloseAct(int ActId, Guid UserId)
        {
            throw new NotImplementedException();
        }

        public async Task<InventarizationWithProducts> Create(int ShopId, Guid UserId)
        {
            var ent = new Inventarization { ShopId = ShopId, Status = "", UserCreatedId = UserId, UserUpdatedId = UserId, Description = "" };
            await _context.Inventarizations.AddAsync(ent);

            return new InventarizationWithProducts { Inventarization = ent, Products = new List<InventarizationProduct>() };
        }

        public async Task<List<InventarizationWithProducts>> GetByShop(int ShopId, int Take)
        {
            var invs = await _context.Inventarizations.Where(n => n.ShopId == ShopId).Take(Take).ToListAsync();

            var products = await _context.InventarizationProducts.Where(n => invs.Select(n => n.Id).Contains(n.InventariazationId)).ToListAsync();

            return invs.Select(n=>new InventarizationWithProducts { Inventarization = n,Products = products.Where(m=>m.InventariazationId == n.Id).ToList() }).ToList();
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
