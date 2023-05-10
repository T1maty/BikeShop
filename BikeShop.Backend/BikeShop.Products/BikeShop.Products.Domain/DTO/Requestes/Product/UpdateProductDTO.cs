using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.Product
{
    public class UpdateProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string CatalogKey { get; set; } = string.Empty;
        public string? Category { get; set; } = string.Empty;
        public string? ManufacturerBarcode { get; set; } = string.Empty;
        public bool RetailVisibility { get; set; } = false;
        public bool B2BVisibility { get; set; } = false;
    }
}
