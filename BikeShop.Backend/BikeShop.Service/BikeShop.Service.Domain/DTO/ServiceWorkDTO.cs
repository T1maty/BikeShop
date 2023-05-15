using AutoMapper;
using BikeShop.Service.Application.Common.Mappings;
using BikeShop.Service.Domain.Entities;
using BikeShop.Service.Domain.RefitDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Application.DTO
{
    public class ServiceWorkDTO : IMappable
    {
        public int Id { get; set; }
        public int WorkId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal ComplicationPrice { get; set; } = 0;
        public decimal Discount { get; set; }
        public Guid UserId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ServiceWorkDTO, ServiceWork>();
        }
    }
}
