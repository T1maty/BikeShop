using BikeShop.Service.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Application.DTO
{
    public class UpdateServiceDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ClientDescription { get; set; } 
        public string UserMasterDescription { get; set; }
        public string UserCreatedDescription { get; set; }

        public Guid UserId { get; set; }
        public Guid UserMasterId { get; set; }
        public int WorkDiscountId { get; set; }
        public int ProductDiscountId { get; set; }

        public List<ServiceProductDTO> ServiceProducts { get; set; }
        public List<ServiceWorkDTO> ServiceWorks { get; set; }
    }
}
