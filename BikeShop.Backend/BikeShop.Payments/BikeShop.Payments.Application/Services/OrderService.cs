using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Domain.DTO.Requests.Order;
using BikeShop.Payments.Domain.DTO.Responses;
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
    public class OrderService : IOrderService
    {
        private readonly IApplicationDbContext _context;

        public OrderService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<OrderWithProducts>> GetByShop(int ShopId)
        {
            var orders = await _context.Orders.Where(n => n.ShopId == ShopId).ToListAsync();
            var products = await _context.OrderProducts.Where(n => orders.Select(k => k.Id).Contains(n.OrderId)).ToListAsync();

            return orders.Select(n=> new OrderWithProducts { Order = n, Products = products.Where(n1=>n1.OrderId == n.Id ).ToList() }).ToList();
        }

        public async Task<OrderWithProducts> PublicCreate(PublicCreateOrderDTO dto)
        {
            var products = new List<OrderProduct>();
            foreach (var product in dto.Products)
            {
                products.Add(new OrderProduct
                {
                    CatalogKey = product.CatalogKey,
                    Discount = product.Discount,
                    Description = product.Description,
                    Name = product.Name,
                    Price = product.Price,
                    ProductId = product.ProductId,
                    Quantity = product.Quantity,
                    QuantityUnitId = product.QuantityUnitId,
                    QuantityUnitName = product.QuantityUnitName,
                    SerialNumber = product.SerialNumber,
                    Total = product.Price * product.Quantity - product.Discount
                });
            }

            var order = new Order
            {
             ClientEmail = dto.Order.ClientEmail,
              ClientFIO= dto.Order.ClientFIO,
                ClientId=dto.Order.ClientId, 
                ClientPhone=dto.Order.ClientPhone, 
                DeliveryInfo=dto.Order.DeliveryInfo, 
                DeliveryType=dto.Order.DeliveryType,
                 Description = "", 
                DescriptionUser=dto.Order.DescriptionUser, 
                DiscountId=dto.Order.DiscountId, 
                IsPayed = false, 
                ShopId =dto.Order.ShopId,
                  OrderStatus = OrderStatus.Created, 
                OrderType = OrderType.Retail, 
                UserFIO = "", 
                UserId = null, 
                TotalDiscount = products.Select(n=>n.Discount).Sum(), 
                TotalPrice = products.Select(n=>n.Total).Sum()
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync(new CancellationToken());

            products.ForEach(n => n.OrderId = order.Id);

            await _context.OrderProducts.AddRangeAsync(products);
            await _context.SaveChangesAsync(new CancellationToken());

            return new OrderWithProducts { Order = order, Products = products };
        }
    }
}
