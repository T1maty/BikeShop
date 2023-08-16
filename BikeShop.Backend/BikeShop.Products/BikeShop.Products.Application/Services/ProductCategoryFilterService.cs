using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.Category;
using BikeShop.Products.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Services
{
    public class ProductCategoryFilterService : IProductCategoryFilterService
    {
        private readonly IApplicationDbContext _context;

        public ProductCategoryFilterService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProductCategory> CreateCategory(CreateCategoryDTO model)
        {
            var category = new ProductCategory { IsB2BVisible= model.IsB2BVisible, IsCollapsed= model.IsCollapsed, IsRetailVisible=model.IsRetailVisible, Name = model.Name
            , ParentId = model.ParentId, SortOrder = model.SortOrder};
            await SetWay(category);
            await _context.ProductCategories.AddAsync(category);
            await _context.SaveChangesAsync(new CancellationToken());
            return category;
        }

        public async Task DeleteCategory(int Id)
        {
            var ent = await _context.ProductCategories.FindAsync(Id);
            if (ent != null)
            {
                _context.ProductCategories.Remove(ent);
                await _context.SaveChangesAsync(new CancellationToken());
            }
            else throw new Exception();
        }

        public async Task<List<ProductCategory>> GetAllCategories()
        {
            return await _context.ProductCategories.ToListAsync();
        }

        public async Task transfer()
        {
            var cats = await _context.ProductTags.Where(n => n.IsUniversal == false).ToListAsync();
            var binds = await _context.TagToProductBinds.Where(n => cats.Select(m => m.Id).Contains(n.ProductTagId)).ToListAsync();
            var prods = _context.Products;

            foreach (var model in cats)
            {
                var g = new ProductCategory
                {
                    IsB2BVisible = model.IsB2BVisible,
                    IsCollapsed = model.IsCollapsed,
                    IsRetailVisible = model.IsRetailVisible,
                    Name = model.Name,
                    ParentId = model.ParentId,
                    SortOrder = model.SortOrder
                };
                await SetWay(g);
                await _context.ProductCategories.AddAsync(g);
                await _context.SaveChangesAsync(new CancellationToken());

                var prodBinds = binds.Where(n=>n.ProductTagId == model.Id).Select(n=>n.ProductId).Distinct().ToList();
                foreach (var i in prodBinds)
                {
                    var p = await prods.FindAsync(i);
                    p.CategoryId = g.Id;
                    p.CategoryName = g.Name;
                    p.CategoryWay = g.Way;
                }
            }

            await _context.SaveChangesAsync(new CancellationToken());

        }

        public async Task<ProductCategory> UpdateCategory(UpdateCategoryDTO model)
        {
            var ent = await _context.ProductCategories.FindAsync(model.Id);
            if (ent == null) throw new Exception();

            ent.SortOrder = model.SortOrder;
            ent.ParentId = model.ParentId;
            ent.IsB2BVisible = model.IsB2BVisible;
            ent.UpdatedAt = DateTime.Now;
            ent.IsCollapsed = model.IsCollapsed;
            ent.IsRetailVisible = model.IsRetailVisible;
            ent.Name = model.Name;
            await SetWay(ent);
            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }

        private async Task<ProductCategory> SetWay(ProductCategory cat)
        {
            var cats = await _context.ProductCategories.ToListAsync();

            var way = new List<string>();

            
            var parentId = cat.ParentId;
            way.Add(cat.Name);

            while (parentId != 0)
            {
                var finded = cats.Where(n => n.Id == parentId).FirstOrDefault();
                if (finded == null) { parentId = 0; break; }
                parentId = finded.ParentId;
                way.Add(finded.Name);
            }

            var wayStr = "";
            way.Reverse();
            way.ForEach(n => { wayStr += n+"->"; });
            wayStr = wayStr.Trim('>');
            wayStr = wayStr.Trim('-');

            cat.Way = wayStr;
            return cat;
        }
    }
}
