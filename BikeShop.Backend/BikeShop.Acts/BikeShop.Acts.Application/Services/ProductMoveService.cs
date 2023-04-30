using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.Requests.ProductMove;
using BikeShop.Products.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Services
{
    public class ProductMoveService : IProductMoveService
    {
        private readonly IApplicationDbContext _context;

        public ProductMoveService(IApplicationDbContext context)
        {
            _context = context;
        }

        public Task<ProductMoveWithProducts> Create(ProductMoveCreateDTO dto)
        {
            throw new NotImplementedException();
        }

        public Task<ProductMoveWithProducts> Execute(int ActId, Guid User)
        {
            throw new NotImplementedException();
        }

        public Task<List<ProductMoveWithProducts>> GetByShop(int ShopId, int Take)
        {
            throw new NotImplementedException();
        }

        public Task<ProductMoveWithProducts> SetStatusToTransfer(int ActId, Guid User)
        {
            throw new NotImplementedException();
        }

        public Task<ProductMoveWithProducts> Update(ProductMoveUpdateDTO dto)
        {
            throw new NotImplementedException();
        }
    }
}
