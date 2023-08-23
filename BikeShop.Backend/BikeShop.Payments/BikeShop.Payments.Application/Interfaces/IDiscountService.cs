using BikeShop.Payments.Domain.DTO.Requests.Discount;
using BikeShop.Payments.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Interfaces
{
    public interface IDiscountService
    {
        public Task<Discount> CreateDiscount(DiscountCreateDTO dto);
        public Task<Discount> UpdateDiscount(DiscountUpdateDTO dto);
        public Task<List<Discount>> GetAll();
        public Task RemovaDiscount(int discountId);
        public Task<Discount> GetById(int discountId);
        public Task<decimal> Calculate(int discountId, string target, decimal startPrice);

    }
}
