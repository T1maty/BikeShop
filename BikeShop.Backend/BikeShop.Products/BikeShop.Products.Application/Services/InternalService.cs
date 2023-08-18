using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.Product;
using BikeShop.Products.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Services
{
    public class InternalService : IInternalService
    {
        private readonly IApplicationDbContext _context;

        public InternalService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TagToCategoryBind>> GetCatDepList()
        {
            return await _context.TagToCategoryBinds.ToListAsync(); 
        }

        public async Task<List<ResponseProductWithTags>> productsAvailable()
        {
            var prodsIds = await _context.StorageProducts.Where(n=>n.Quantity > 0).Select(n => n.ProductId).ToListAsync();
            var prods = _context.Products.Where(n => prodsIds.Contains(n.Id));
            //var r = await _context.TagToProductBinds.Where(n => prods.Select(q => q.Id).Contains(n.ProductId)).ToListAsync();


            //var tags = await _context.ProductTags.Where(n => r.Select(q => q.ProductTagId).Contains(n.Id)).ToDictionaryAsync(n => n.Id, n => n.Name);

            var answ = new List<ResponseProductWithTags>();

            foreach (var p in await prods.ToListAsync())
            {
                //var ent = new ResponseProductWithTags { product = p, tags = r.Where(n => n.ProductId == p.Id).ToDictionary(n => n.ProductTagId, n => tags[n.ProductTagId]) };
                //answ.Add(ent);
            }
            return answ;
        }

        public async Task<List<ResponseProductWithTags>> ProductsByCat(string Cat)
        {
            var prods = _context.Products.Where(n=>n.CategoryImport == Cat);
            //var r = await _context.TagToProductBinds.Where(n => prods.Select(q => q.Id).Contains(n.ProductId)).ToListAsync();
        

            //var tags = await _context.ProductTags.Where(n => r.Select(q => q.ProductTagId).Contains(n.Id)).ToDictionaryAsync(n=>n.Id, n=>n.Name);

            var answ = new List<ResponseProductWithTags>();

            foreach (var p in await prods.ToListAsync()) {
               // var ent = new ResponseProductWithTags { product = p, tags = r.Where(n=>n.ProductId == p.Id).ToDictionary(n=>n.ProductTagId, n => tags[n.ProductTagId]) };
                //answ.Add(ent);
            }
            return answ;
        }

        public async Task SetProductTags(int prodId, List<int> tags)
        {
            /*
            var ents = await _context.TagToProductBinds.Where(n => n.ProductId == prodId).ToDictionaryAsync(n=>n.ProductTagId, n=>n);

            var newTags = new List<TagToProductBind>();

            foreach (var t in tags)
            {
                if(!ents.ContainsKey(t))
                {
                    newTags.Add(new TagToProductBind { ProductId = prodId, ProductTagId = t });
                }
                else
                {
                    ents.Remove(t);
                }
            }

            _context.TagToProductBinds.RemoveRange(ents.Values);
            await _context.TagToProductBinds.AddRangeAsync(newTags);

            await _context.SaveChangesAsync(new CancellationToken());
            */
        }

        public async Task<TagToCategoryBind> UpdateCatDep(int depId, int TagId, string TagName, string CatName)
        {
            var ent = await _context.TagToCategoryBinds.FindAsync(depId);
            ent.TagName = TagName;
            ent.TagId = TagId;
            ent.UpdatedAt = DateTime.Now;
            ent.CategoryName = CatName;

            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }

        public async Task UpdateCategoriesList()
        {
            var allCats =await  _context.Products.Select(n => n.CategoryImport).ToListAsync();

            HashSet<string> uniqueStrings = new HashSet<string>(allCats);

            // Очистка списка и добавление уникальных строк
            allCats.Clear();
            allCats.AddRange(uniqueStrings);

            var existCats = await _context.TagToCategoryBinds.Select(n => n.CategoryName).ToListAsync();

            var newCats = new List<TagToCategoryBind>();

            allCats.ForEach(n => {
                if (!existCats.Contains(n)) newCats.Add(new TagToCategoryBind { CategoryName = n });
            });

            await _context.TagToCategoryBinds.AddRangeAsync(newCats);
            await _context.SaveChangesAsync(new CancellationToken());
        }
    }
}
