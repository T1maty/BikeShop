using BikeShop.Products.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Services
{
    public class ProductCardService : IProductCardService
    {
        private readonly IProductCardService _productCardService;

        public ProductCardService(IProductCardService productCardService)
        {
            _productCardService = productCardService;
        }

        public async Task UpdateProductCard()
        {

        }
    }
}
