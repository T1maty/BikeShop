using BikeShop.Shop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Shop.Domain.DTO.RefitModels
{
    public class User
    {
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? patronymic { get; set; }
    }
}
