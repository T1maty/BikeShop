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
        public Task<OrderWithProducts> Confirm(Guid UserId, int OrderId);
        public Task<OrderWithProducts> AddPayment(Guid UserId, int OrderId);
        public Task<OrderWithProducts> Collected(Guid UserId, int OrderId);
        public Task<OrderWithProducts> Cancel(Guid UserId, int OrderId);
        public Task<OrderWithProducts> Issue(Guid UserId, int OrderId);
        public Task<OrderWithProducts> Shipped(Guid UserId, int OrderId);
        public Task<OrderWithProducts> Delivered(Guid UserId, int OrderId);
        public Task<OrderWithProducts> InternalCreate(InternalCreateOrderDTO dto);

    }
}
