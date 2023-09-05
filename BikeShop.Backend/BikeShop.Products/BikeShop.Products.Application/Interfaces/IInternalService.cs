using BikeShop.Products.Domain.DTO.Requestes.Product;
using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Interfaces
{
    public interface IInternalService
    {
        public Task UpdateCategoriesList();
        public Task<List<TagToCategoryBind>> GetCatDepList();
        public Task<TagToCategoryBind> UpdateCatDep(int depId, int TagId, string TagName, string CatName);
        public Task ProductsByCat(string Cat);
        public Task SetProductTags(int prodId, List<int> tags);
        public Task productsAvailable();
    }
}
