﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.SupplyInvoice
{
    public class SupplyInvoiceDTO
    {
        public int ShopId { get; set; }
        public Guid User { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
