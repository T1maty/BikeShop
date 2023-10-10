using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Responses.Public
{
    public class PublicProductSearchResponse
    {
        public List<ProductCardDTO> Products { get; set; } = new List<ProductCardDTO>();
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public int TotalPages { get; set; }
        public int TotalProducts { get; set; }
        public int StorageId { get; set; }

        public List<OptionVariant> Options { get; set; } = new List<OptionVariant>();
        public List<string> SortingSettings { get; set; } = new List<string>();
        public List<int> FilterSettings { get; set; } = new List<int>();
    }
}
