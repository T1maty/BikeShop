﻿using BikeShop.Payments.Application.Common.Errors;
using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Domain.DTO.Requests.Discount;
using BikeShop.Payments.Domain.Entities;
using BikeShop.Payments.Domain.Enumerables;
using BikeShop.Products.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Services
{
    public class DiscountService : IDiscountService
    {
        private readonly IApplicationDbContext _context;

        public DiscountService(IApplicationDbContext context)
        {
            _context = context;
        }

        public Task<Discount> CreateDiscount(DiscountCreateDTO dto)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Discount>> GetAll()
        {
            return await _context.Discounts.ToListAsync();
        }

        public async Task<Discount> GetById(int discountId)
        {
            return await _context.Discounts.FindAsync(discountId);
        }

        public async Task RemovaDiscount(int discountId)
        {
            _context.Discounts.Remove(await _context.Discounts.FindAsync(discountId));
            await _context.SaveChangesAsync(new CancellationToken());
        }

        public Task<Discount> UpdateDiscount(DiscountUpdateDTO dto)
        {
            throw new NotImplementedException();
        }

        public async Task<decimal> CalculateDiscount (Discount discount, List<DiscountTarget> targets, decimal startPrice)
        {
            var type = Enum.Parse<DiscountTarget>(discount.Target);
            if (!targets.Contains(type)) throw DiscountError.WrongDiscountTarget;

            decimal res = 0;

            if(discount.Type == DiscountType.Percent.ToString())
            {
                res = startPrice / 100 * discount.Amount;
            }

            if (discount.Type == DiscountType.Static.ToString())
            {
                res = startPrice / 100 * discount.Amount;
            }

            if (res > discount.Limit) res = discount.Limit;

            return res;
        }

        public async Task<decimal> Calculate(int discountId, string target, decimal startPrice)
        {
            var discount = (await _context.Discounts.FindAsync(discountId));

            if (discount == null) 
                throw DiscountError.DiscountNotFount;
            if (!Enum.IsDefined(typeof(DiscountTarget),target)) 
                throw DiscountError.DiscountTargetNotFount;

            return await CalculateDiscount(discount, new List<DiscountTarget> { Enum.Parse<DiscountTarget>(target) }, startPrice);
        }

        public async Task<List<Discount>> GetByTarget(string target, Guid user)
        {
            if (!Enum.IsDefined(typeof(DiscountTarget), target))
                throw DiscountError.DiscountTargetNotFount;

            return await _context.Discounts.Where(n => n.Target == target).Where(n=>n.Enabled == true).ToListAsync();
        }
    }
}
