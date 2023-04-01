using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.ProductCard
{
    public class ProductImagesDTO
    {
        public int id { get; set; }

        public int sortOrder { get; set; }
        public bool enabled { get; set; }

        public IFormFile? image { get; set; }
    }
}
