using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Domain.DTO.Response
{
    public class UserResponse
    {
        public Guid Id { get; set; }
        public string? Email { get; set; }
        public bool EmailConfirmed { get; set; } = false; 
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; } = false;
        public bool TwoFactorEnabled { get; set; } = false;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Patronymic { get; set; }
        public int ShopId { get; set; }
        public bool IsEmployee { get; set; } = false;

        public string Bike { get; set; } = string.Empty;
        public decimal Balance { get; set; }
        public decimal CreditLimit { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime Updated { get; set; } = DateTime.Now;
    }
}
