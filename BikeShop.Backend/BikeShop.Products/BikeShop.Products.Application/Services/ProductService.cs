using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IApplicationDbContext _context;

        public ProductService(IApplicationDbContext context)
        {
            _context = context;

        }

        public async Task<List<Product>> GetProductsByIdsArray(List<int> Ids)
        {
            return await _context.Products.Where(n => Ids.Contains(n.Id)).ToListAsync();
        }
    }
}
