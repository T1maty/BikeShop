using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.Internal;
using BikeShop.Products.Domain.DTO.Requestes.Product;
using BikeShop.Products.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Tls;
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
        private readonly IProductService _productService;

        public InternalService(IApplicationDbContext context, IProductService productService)
        {
            _context = context;
            _productService = productService;
        }

        public async Task<List<TagToCategoryBind>> GetCatDepList()
        {
            return await _context.TagToCategoryBinds.ToListAsync(); 
        }

        public async Task<List<ProductWithCataAndFilters>> productsAvailable()
        {
            var prodsIds = await _context.StorageProducts.Where(n=>n.Quantity > 0).Select(n => n.ProductId).ToListAsync();
            var prods = await _context.Products.Where(n => prodsIds.Contains(n.Id)).ToListAsync();
            var cat = await _context.ProductCategories.ToDictionaryAsync(n=>n.Id, n=>n);
            var filters = await _context.ProductOptionVariantBinds.Where(n => prodsIds.Contains(n.ProductId)).ToListAsync();
            return prods.Select(n => new ProductWithCataAndFilters { Product = n, category= cat.TryGetValue(n.CategoryId, out var c)?c:null, filters = filters.Where(f=>f.ProductId == n.Id).ToList()}).ToList();
        }

        public async Task ProductsByCat(string Cat)
        {
            var prods = _context.Products.Where(n=>n.CategoryImport == Cat);
            
            
        }

        public async Task<ProductWithCataAndFilters> SetProductTags(int prodId, int catId, List<int> VariantIds)
        {
            await _productService.ChangeCategory(prodId, catId);

            var variants = await _context.ProductOptionVariantBinds.Where(n => n.ProductId == prodId).Select(n=>n.OptionVariantId).ToListAsync();
            var newVariants = new List<ProductOptionVariantBind>();
            var vEnts = await _context.OptionVariants.Where(n => VariantIds.Contains(n.Id)).ToDictionaryAsync(n=>n.Id, n=>n);

            foreach (var i in VariantIds)
            {
                if (!variants.Contains(i))
                {
                    var ent = vEnts[i];
                    newVariants.Add(new ProductOptionVariantBind { Name = ent.Name, OptionId = ent.OptionId, OptionName = ent.OptionName, OptionVariantId = ent.Id, ProductId = prodId, SortOrder = 0  });
                }
                else
                {
                    variants.Remove(i);
                }
            }

            await _context.ProductOptionVariantBinds.AddRangeAsync(newVariants);
            _context.ProductOptionVariantBinds.RemoveRange(_context.ProductOptionVariantBinds.Where(n=>variants.Contains(n.OptionVariantId)).Where(n=>n.ProductId == prodId));

            await _context.SaveChangesAsync(new CancellationToken());
            return new ProductWithCataAndFilters { category = await _context.ProductCategories.FindAsync(catId), filters = await _context.ProductOptionVariantBinds.Where(n => n.ProductId == prodId).ToListAsync(), Product = await _context.Products.FindAsync(prodId) };
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
