using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Application.Refit;
using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.Requests.OutcomeAct;
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
    public class OutcomeActService : IOutcomeActService
    {
        private readonly IApplicationDbContext _context;
        private readonly IProductClient _productClient;
        private readonly IShopClient _shopClient;
        private readonly IIdentityClient _identityClient;

        public OutcomeActService(IApplicationDbContext context, IProductClient productClient, IShopClient shopClient, IIdentityClient identityClient)
        {
            _context = context;
            _productClient = productClient;
            _shopClient = shopClient;
            _identityClient = identityClient;
        }

        public async Task<OutcomeActWithProducts> Create(CreateOutcomeActDTO dto)
        {
            //var user = await _identityClient.GetById(dto.OutcomeAct.UserId);
            //var FIO = user.lastName + " " + user.firstName + " " + user.patronymic;
            var FIO = "XUI";
            var act = new OutcomeAct { Description = dto.OutcomeAct.Description, OutcomeActStatus = "Created", ShopId= dto.OutcomeAct.ShopId, UserCreatedId = dto.OutcomeAct.UserId, UserUpdatedId = dto.OutcomeAct.UserId, UserCreatedFIO = FIO, UserUpdatedFIO = FIO};

            var quantUnits = (await _productClient.GetAllQuantityUnits()).ToDictionary(n => n.Id, n => n.Name);
            var list = dto.Products.Select(n => n.ProductId).ToList();
            var buf = (await _productClient.GetProductsByIdsArray(list));
            var pE = buf.ToDictionary(n => n.Id, n => n);

            await _context.OutcomeActs.AddAsync(act);
            await _context.SaveChangesAsync(new CancellationToken());

            
            var products = dto.Products.Select(n => new OutcomeActProduct
            {
                OutcomeActId = act.Id,
                Barcode = pE[n.ProductId].Barcode,
                Quantity = n.Quantity,
                ProductId = n.ProductId,
                BrandName = " ",
                Description = n.Description,
                CatalogKey = pE[n.ProductId].CatalogKey,
                DealerPrice = pE[n.ProductId].DealerPrice,
                IncomePrice = pE[n.ProductId].IncomePrice,
                Enabled = pE[n.ProductId].Enabled,
                ManufBarcode = pE[n.ProductId].ManufacturerBarcode,
                Name = pE[n.ProductId].Name,
                QuantityUnitName = quantUnits[pE[n.ProductId].QuantityUnitId],
                RetailPrice = pE[n.ProductId].RetailPrice
            }).ToList();

            await _context.OutcomeActProducts.AddRangeAsync(products);
            await _context.SaveChangesAsync(new CancellationToken());

            return new OutcomeActWithProducts { OutcomeAct = act, Products = products };
        }

        public async Task<OutcomeActWithProducts> Execute(int invoiceId, Guid userId)
        {
            var act = await _context.OutcomeActs.FindAsync(invoiceId);

            if (act == null || act.OutcomeActStatus == "Executed") throw new Exception();

            var prods = await _context.OutcomeActProducts.Where(n => n.OutcomeActId == invoiceId).ToListAsync();

            act.OutcomeActStatus = "Executed";
            act.UpdatedAt = DateTime.Now;
            act.UserUpdatedId = userId;
            var user = await _identityClient.GetById(userId);
            var FIO = user.lastName + " " + user.firstName + " " + user.patronymic;
            act.UserUpdatedFIO = FIO;

            var data = prods.Select(n=> new ProductQuantitySmplDTO { ProductId = n.ProductId, Quantity = n.Quantity * -1}).ToList();

            await _productClient.AddProductsToStorage(data, await _shopClient.GetStorageId(act.ShopId), "OutcomeAct", act.Id);

            await _context.SaveChangesAsync(new CancellationToken());

            return new OutcomeActWithProducts
            {
                OutcomeAct = act,
                Products = prods
            };
        }

        public async Task<List<OutcomeActWithProducts>> GetByShop(int id, int take)
        {
            var acts = await _context.OutcomeActs.Where(n=>n.ShopId == id).Take(take).ToListAsync();
            var prods = await _context.OutcomeActProducts.Where(n => acts.Select(g => g.Id).Contains(n.OutcomeActId)).ToListAsync();

            return acts.Select(n=> new OutcomeActWithProducts { OutcomeAct = n, Products = prods.Where(g=>g.OutcomeActId == n.Id).ToList() }).ToList();
        }

        public async Task<OutcomeActWithProducts> Update(UpdateOutcomeActDTO dto)
        {
            var user = await _identityClient.GetById(dto.OutcomeAct.UserId);
            var FIO = user.lastName + " " + user.firstName + " " + user.patronymic;

            var act = await _context.OutcomeActs.FindAsync(dto.OutcomeAct.Id);
            var quantUnits = (await _productClient.GetAllQuantityUnits()).ToDictionary(n => n.Id, n => n.Name);
            act.UpdatedAt = DateTime.Now;
            act.UserUpdatedId = dto.OutcomeAct.UserId;
            act.UserUpdatedFIO = FIO;
            act.Description = dto.OutcomeAct.Description;

            var pE = (await _productClient.GetProductsByIdsArray(dto.Products.Select(n => n.ProductId).ToList())).ToDictionary(n => n.Id, n => n);

            var existProds = await _context.OutcomeActProducts.Where(n=>n.OutcomeActId == act.Id).ToDictionaryAsync(n=>n.Id, n=>n);
            var newProds = new List<OutcomeActProduct>();
            var actualProds = new List<OutcomeActProduct>();

            foreach (var n in dto.Products)
            {
                if(existProds.TryGetValue(n.Id, out var ent))
                {
                    existProds.Remove(ent.Id);
                    actualProds.Add(ent);
                }
                else
                {
                    ent = new OutcomeActProduct
                    {
                        OutcomeActId = act.Id,
                        Barcode = pE[n.ProductId].Barcode,
                        Quantity = n.Quantity,
                        ProductId = n.ProductId,
                        BrandName = " ",
                        Description = n.Description,
                        CatalogKey = pE[n.ProductId].CatalogKey,
                        DealerPrice = pE[n.ProductId].DealerPrice,
                        IncomePrice = pE[n.ProductId].IncomePrice,
                        Enabled = pE[n.ProductId].Enabled,
                        ManufBarcode = pE[n.ProductId].ManufacturerBarcode,
                        Name = pE[n.ProductId].Name,
                        QuantityUnitName = quantUnits[pE[n.ProductId].QuantityUnitId],
                        RetailPrice = pE[n.ProductId].RetailPrice
                    };
                    newProds.Add(ent);
                    actualProds.Add(ent);
                }
            }


            _context.OutcomeActProducts.RemoveRange(existProds.Values);
            await _context.OutcomeActProducts.AddRangeAsync(newProds);
            await _context.SaveChangesAsync(new CancellationToken());

            return new OutcomeActWithProducts { OutcomeAct = act, Products = actualProds };
        }
    }
}
