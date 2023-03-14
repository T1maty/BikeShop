using AutoMapper;
using BikeShop.Service.Application.Common.Mappings;
using BikeShop.Service.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Domain.RefitDTO
{
    public class ProductQuantitySmplDTO : IMappable
    {
        public int ProductId { get; set; }
        public decimal Quantity { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ServiceProduct, ProductQuantitySmplDTO>();
        }
    }

    
}
