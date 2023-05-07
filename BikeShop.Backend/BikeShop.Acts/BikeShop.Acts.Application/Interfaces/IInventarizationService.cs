using BikeShop.Acts.Domain;
using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.Requests.Inventarization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Interfaces
{
    public interface IInventarizationService
    {
        public Task<List<InventarizationWithProducts>> GetByShop(int ShopId, int Take);
        public Task<InventarizationWithProducts> Create(int ShopId, Guid UserId);
        public Task<InventarizationWithProducts> Update(UpdateInventarizationDTO dto);
        public Task<InventarizationLackWithProducts> CloseAct(int ActId, Guid UserId);
        public Task<List<InventarizationLackWithProducts>> GetLackByShop(int ShopId);
    }
}
