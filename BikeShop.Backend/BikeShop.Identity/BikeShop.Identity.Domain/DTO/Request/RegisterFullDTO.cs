using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Domain.DTO.Request
{
    public class RegisterFullDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Patronymic { get; set; }
        public string? Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
    }
}
