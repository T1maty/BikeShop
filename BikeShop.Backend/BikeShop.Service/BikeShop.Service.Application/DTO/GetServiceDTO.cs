using AutoMapper;
using BikeShop.Service.Application.Common.Mappings;
using BikeShop.Service.Domain.Entities;
using BikeShop.Service.Domain.Enums;
using BikeShop.Service.WebApi.Models.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Service.Application.DTO
{
    public class GetServiceDTO : IMappable
    {
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public bool Enabled { get; set; } = true;


        public string Name { get; set; } = string.Empty; // Название ремонта
        public string Status { get; set; } = "Waiting"; // Статус ремонта

        public UserDTO? Client { get; set; } // Id клиента, чей байк ремонтируют
        public string ClientDescription { get; set; } = string.Empty; // Описание клиента

        public UserDTO? UserCreated { get; set; } // Id пользователья который создал запись
        public string UserCreatedDescription { get; set; } = String.Empty;// описание описание того кто создал

        public UserDTO? UserMaster { get; set; }
        public string UserMasterDescription { get; set; } = String.Empty;

        public UserDTO? UserDeleted { get; set; }// Id юзера который удалил

        public DiscountDTO? WorkDiscount { get; set; }
        public DiscountDTO? ProductDiscount { get; set; }


        public decimal PriceWork { get; set; } // цены
        public decimal DiscountWork { get; set; }
        public decimal TotalWork { get; set; }

        public decimal PriceProduct { get; set; }
        public decimal DiscountProduct { get; set; }
        public decimal TotalProduct { get; set; }

        public decimal Price { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }

        public List<ServiceProduct> Products { get; set; } = new List<ServiceProduct>();
        public List<ServiceWork> Works { get; set; } = new List<ServiceWork>();


        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.Service, GetServiceDTO>();
        }
    }
}
