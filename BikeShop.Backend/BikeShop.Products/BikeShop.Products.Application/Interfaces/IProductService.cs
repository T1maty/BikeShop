using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BikeShop.Products.Application.Interfaces
{
    public interface IProductService
    {
        public Task<List<Product>> GetProductsByIdsArray(List<int> Ids);
    }
}
