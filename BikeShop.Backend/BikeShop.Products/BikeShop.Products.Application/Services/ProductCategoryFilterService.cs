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
            await UpdateChildIds(model.ParentId);
            return category;
        }

        private async Task<ProductCategory> UpdateChildIds(int catId)
        {
            var allCategories = await _context.ProductCategories.ToListAsync();
            var ent = allCategories.Find(n => n.Id == catId);
            var allIds = Get(new List<int> { catId }, allCategories);
            ent.ChildrenIdsList = allIds;

            await _context.SaveChangesAsync(new CancellationToken());

            return ent;
        }

        public async Task DeleteCategory(int Id)
        {
            var ent = await _context.ProductCategories.FindAsync(Id);
            if (ent != null)
            {
                _context.ProductCategories.Remove(ent);
                await _context.SaveChangesAsync(new CancellationToken());
                await UpdateChildIds(ent.ParentId);
            }
            else throw new Exception();
        }

        public async Task<List<ProductCategory>> GetAllCategories()
        {
            return await _context.ProductCategories.ToListAsync();
        }

        private List<int> Get(List<int> parents, List<ProductCategory> data)
        {
            var childs = data.Where(n => parents.Contains(n.ParentId)).Select(n => n.Id).ToList();
            if (childs.Count > 0) childs.AddRange(Get(childs, data));
            return childs;
        }
        public async Task transfer()
        {
            //не переменено к проде, чистка дубликатов вариантов
            var variants = await _context.ProductOptionVariantBinds.ToListAsync();
            var optIds = variants.Select(n => n.OptionId).Distinct();
            var prodIds = variants.Select(n => n.ProductId).Distinct();

            foreach (var opt in optIds)
            {
                foreach (var p in prodIds)
                {
                    var list = variants.Where(n => n.OptionId == opt).Where(n=>n.ProductId== p).ToList();
                    if (list.Count > 1)
                    {
                        list.RemoveAt(0);
                        _context.ProductOptionVariantBinds.RemoveRange(list);
                    }
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
            await UpdateChildIds(model.ParentId);
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
