using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Domain.DTO.Request.Social
{
    public class SocialRegisterDTO
    {
        public string SocialId { get; set; }
        public string SocialType { get; set; }
        public string Phone { get; set; }

        public string? Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Patronymic { get; set; }
        public string? Email { get; set; }
        public string? Gender { get; set; }
        public DateTime? Birth { get; set; }
        public string? Language { get; set; }

    }
}
