using BikeShop.Payments.Domain.DTO.Requests.Order;
using BikeShop.Payments.Domain.DTO.Responses;
using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Interfaces
{
    public interface IOrderService
    {
        public Task<List<OrderWithProducts>> GetByShop(int ShopId);
        public Task<OrderWithProducts> PublicCreate(PublicCreateOrderDTO dto);
        public Task<List<OrderWithProducts>> GetAll(int Take, int Skip);
        public Task<OrderWithProducts> GetById(int Id);


    }
}
