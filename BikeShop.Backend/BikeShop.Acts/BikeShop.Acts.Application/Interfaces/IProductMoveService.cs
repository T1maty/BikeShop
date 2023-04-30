using BikeShop.Acts.Domain.DTO.Requests.ProductMove;
using BikeShop.Acts.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Interfaces
{
    public interface IProductMoveService
    {
        public Task<List<ProductMoveWithProducts>> GetByShop(int ShopId, int Take);
        public Task<ProductMoveWithProducts> Create(ProductMoveCreateDTO dto);
        public Task<ProductMoveWithProducts> Update(ProductMoveUpdateDTO dto);
        public Task<ProductMoveWithProducts> SetStatusToTransfer(int ActId, Guid User);
        public Task<ProductMoveWithProducts> Execute(int ActId, Guid User);
    }
}
