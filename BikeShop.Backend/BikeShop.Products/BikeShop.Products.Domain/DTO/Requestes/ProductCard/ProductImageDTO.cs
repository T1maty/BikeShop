﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.ProductCard
{
    public class ProductImageDTO
    {
        public int Id { get; set; }
        public int SortOrder { get; set; }
        public int ProductId { get; set; }
    }
}
