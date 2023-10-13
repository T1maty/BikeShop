using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Scriban
{
    public class EncashmentModel
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public string Cash { get; set; }
        public string Terminal { get; set; }
        public string Left { get; set; }
        public string CurSymbol { get; set; }

    }
}
