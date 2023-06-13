using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Refit.Checkbox
{
    public class Receipt
    {
        public Guid id { get; set; }
        public List<GoodModel> goods { get; set; }
        public List<Pymnt> payments { get; set; }
    }
}
