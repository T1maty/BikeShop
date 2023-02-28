using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.Entities
{
    public class ProductStorageMove : BaseEntity
    {
        public string MoveDirection { get; set; }
        public string ProductMoveSource { get; set; }
        public int SourceId { get; set; }
        public int StorageId { get; set; }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string CatalogKey { get; set; }
        public decimal Quantity { get; set; }
        public string QuantityUnit { get; set; }
        public decimal Price { get; set; }
        public string PriceCurrency { get; set; }
    }
}
