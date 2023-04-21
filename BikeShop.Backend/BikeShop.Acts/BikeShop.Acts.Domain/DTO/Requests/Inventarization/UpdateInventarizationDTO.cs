using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Requests.Inventarization
{
    public class UpdateInventarizationDTO
    {
        public UpdateInvDTO Inventarization { get; set; }
        public List<UpdateInvProductDTO> Products { get; set; }
    }
}
