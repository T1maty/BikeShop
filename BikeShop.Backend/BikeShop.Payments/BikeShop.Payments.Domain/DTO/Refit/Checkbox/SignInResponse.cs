using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Domain.DTO.Refit.Checkbox
{
    public class SignInResponse
    {
        public string type { get; set; }
        public string token_type { get; set; }
        public string access_token { get; set; }
    }
}
