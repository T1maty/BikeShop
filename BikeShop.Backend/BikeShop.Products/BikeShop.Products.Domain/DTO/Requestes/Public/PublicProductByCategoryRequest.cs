using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.Public
{
    public class PublicProductByCategoryRequest
    {
        public int CategoryId { get; set; }
        public int StorageId { get; set; }
        public int? Page { get; set; } = 1;
        public int? PageSize { get; set; } = 20;
        public List<int> FiltersVariantIds { get; set; }
        public List<string> SortingSettings { get; set; }
    }
}
