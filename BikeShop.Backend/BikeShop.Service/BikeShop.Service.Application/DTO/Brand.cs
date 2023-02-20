using BikeShop.Service.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Application.DTO
{
    public class Brand : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string ImageSource { get; set; } = string.Empty;
        public int SortOrder { get; set; }
    }
}
