using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Scriban
{
    public class ProductStickerModel
    {
        public int Id { get; set; }
        public string Barcode { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string CurSymbol { get; set; }
        public string CatalogKey { get; set; }
    }
}
