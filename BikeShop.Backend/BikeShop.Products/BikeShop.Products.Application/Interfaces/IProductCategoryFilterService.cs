using BikeShop.Products.Domain.DTO.Requestes.Category;
using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Interfaces
{
    public interface IProductCategoryFilterService
    {
        public Task<ProductCategory> CreateCategory(CreateCategoryDTO model);
        public Task<ProductCategory> UpdateCategory(UpdateCategoryDTO model);
        public Task<List<ProductCategory>> GetAllCategories();
        public Task DeleteCategory(int Id);
        public Task transfer();

    }
}
