using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Requests
{
    public class UpdateCurrencyDTO : CreateCurrencyDTO
    {
        public int Id { get; set; }
    }
}
