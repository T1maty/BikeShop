﻿using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.Entities
{
    public class OutcomeActProduct : BaseEntity
    {
        public int OutcomeActId { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CatalogKey { get; set; }
        public string Barcode { get; set; }
        public string ManufBarcode { get; set; }
        public string QuantityUnitName { get; set; }
        public decimal IncomePrice { get; set; }
        public decimal DealerPrice { get; set; }
        public decimal RetailPrice { get; set; }
        public string BrandName { get; set; }
        public decimal Quantity { get; set; }
    }
}
