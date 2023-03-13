using BikeShop.Service.Domain.RefitDTO;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Application.RefitClients
{
    public interface IProductsClient
    {
        [Post("/storage/updatereservationproducts")]
        public Task UpdateReservationProducts(UpdateReservationProductsDTO dto, int storageId);
    }
}
