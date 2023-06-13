using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Refit.Checkbox
{
    public class Good
    {
        public string code { get; set; }
        public string name { get; set; }
        public int price { get; set; }
        public List<int> tax { get; set; } = new List<int> { 8 };
    }
}
