using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Domain.RefitDTO
{
    public class UpdateReservationProductsDTO
    {
        public List<ProductQuantitySmplDTO>? OldReservationProducts { get; set; }
        public List<ProductQuantitySmplDTO>? NewReservationProducts { get; set; }
    }
}
