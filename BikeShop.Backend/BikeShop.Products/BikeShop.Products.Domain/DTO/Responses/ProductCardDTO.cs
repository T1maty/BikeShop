﻿using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Responses
{
    public class ProductCardDTO
    {
        public Product product { get; set; }
        public ProductCard? productCard { get; set; }
        public List<ProductSpecification> productSpecifications { get; set; }
        public List<ProductOptionVariantBind> productOptions { get; set; }
        public List<ProductImg> productImages { get; set; }
    }
}
