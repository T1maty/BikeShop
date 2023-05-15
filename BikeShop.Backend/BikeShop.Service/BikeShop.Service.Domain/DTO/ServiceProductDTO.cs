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
    public class ServiceProductDTO : IMappable
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string CatalogKey { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public int QuantityUnitId { get; set; }
        public string QuantityUnitName { get; set; }
        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public Guid UserId { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ServiceProductDTO, ServiceProduct>();
        }
    }
}
