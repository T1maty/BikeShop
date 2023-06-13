using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Refit.Checkbox
{
    public class GoodModel
    {
        public Good good { get; set; }
        public int quantity { get; set; }
        public bool is_return { get; set; } = false;
    }
}
