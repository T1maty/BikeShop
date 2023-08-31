﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Domain.DTO.Requestes.Filters
{
    public class UpdateFilterDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string GroupName { get; set; }
        public bool IsCollapsed { get; set; }
        public bool IsRetailVisible { get; set; }
        public bool IsB2BVisible { get; set; }
        public int SortOrder { get; set; }
        public int GroupSortOrder { get; set; }
    }
}
