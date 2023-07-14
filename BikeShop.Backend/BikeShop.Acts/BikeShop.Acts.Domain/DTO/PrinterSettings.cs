using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO
{
    public class PrinterSettings
    {
        public string? printerName { get; set; }
        public int pageWight { get; set; }
        public int copies { get; set; }
    }
}
