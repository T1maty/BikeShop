using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Identity.Domain.DTO.Request.Social
{
    public class SocialLoginDTO
    {
        public string SocialId { get; set; }
        public string SocialType { get; set; }
    }
}
