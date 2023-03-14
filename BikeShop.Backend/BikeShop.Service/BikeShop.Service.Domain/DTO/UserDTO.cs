using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BikeShop.Service.Application.DTO
{
    public class UserDTO
    {
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? patronymic { get; set; }
        public int shopId { get; set; }
        public decimal balance { get; set; }
        public int balanceCurrencyId { get; set; }
        public decimal creditLimit { get; set; }
        public Guid id { get; set; }
        public string? email { get; set; }
        public bool emailConfirmed { get; set; }
        public string phoneNumber { get; set; }
        public bool phoneNumberConfirmed { get; set; }
    }
}
