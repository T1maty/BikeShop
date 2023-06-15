using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Domain.DTO.Request
{
    public class CreateUserDTO
    {
        public string Phone { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Patronymic { get; set; }
    }
}
