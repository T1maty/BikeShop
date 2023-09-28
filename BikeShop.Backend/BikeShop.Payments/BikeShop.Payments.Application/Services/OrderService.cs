using BikeShop.Acts.Application.Refit;
using BikeShop.Payments.Application.Common.Errors;
using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Application.Refit;
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
        private readonly IProductClient _productClient;
        private readonly IIdentityClient _identityClient;

        public OrderService(IApplicationDbContext context, IProductClient productClient, IIdentityClient identityClient)
        {
            _context = context;
            _productClient = productClient;
            _identityClient = identityClient;
        }

        public async Task<List<OrderWithProducts>> GetAll(int Take, int Skip)
        {
            var orders = await _context.Orders.Skip(Skip).Take(Take).ToListAsync();

            var Result = new List<OrderWithProducts>();
            var products = await _context.OrderProducts.Where(n => orders.Select(k => k.Id).Contains(n.OrderId)).ToListAsync();
            var userList = new List<string>();
            orders.ForEach(n =>
            {
                userList.Add(n.ClientId.ToString());
                if (n.UserCreated != null) userList.Add(n.UserCreated.ToString());
                if (n.UserUpdated != null) userList.Add(n.UserUpdated.ToString());
                if (n.ManagerId != null) userList.Add(n.ManagerId.ToString());
            });

            var users = await _identityClient.GetDictionary(userList);
            var payments = await _context.Payments.Where(n => orders.Select(n1 => n1.PaymentId).Contains(n.Id)).ToDictionaryAsync(n => n.Id, n => n);

            foreach (var order in orders)
            {
                users.TryGetValue(order.ClientId.ToString(), out var Client);
                if (Client == null) throw OrderErrors.ClientNotFound;
                users.TryGetValue(order.UserCreated.ToString(), out var UserCreated);
                users.TryGetValue(order.UserUpdated.ToString(), out var UserUpdated);
                users.TryGetValue(order.ManagerId.ToString(), out var Manager);
                payments.TryGetValue(order.PaymentId, out var Payment);

                var ent = new OrderWithProducts
                {
                    Order = order,
                    Products = products.Where(n => n.OrderId == order.Id).ToList(),
                    Client = Client,
                    UserCreated = UserCreated,
                    UserUpdated = UserUpdated,
                    Manager = Manager,
                    Payment = Payment
                };

                Result.Add(ent);
            }

            return Result;
        }

        public async Task<OrderWithProducts> GetById(int Id)
        {
            var order = await _context.Orders.FindAsync(Id);
            if (order == null) throw OrderErrors.OrderNotFount;

            var Result = new OrderWithProducts();
            Result.Products = await _context.OrderProducts.Where(n => n.OrderId == order.Id).ToListAsync();
            Result.Payment = await _context.Payments.FindAsync(order.Id);

            var userList = new List<string>
            {
                order.ClientId.ToString()
            };
            if (order.UserCreated != null) userList.Add(order.UserCreated.ToString());
            if (order.UserUpdated != null) userList.Add(order.UserUpdated.ToString());
            if (order.ManagerId != null) userList.Add(order.ManagerId.ToString());
            var users = await _identityClient.GetDictionary(userList);

            users.TryGetValue(order.ClientId.ToString(), out var Client);
            if (Client == null) throw OrderErrors.ClientNotFound;
            users.TryGetValue(order.UserCreated.ToString(), out var UserCreated);
            users.TryGetValue(order.UserUpdated.ToString(), out var UserUpdated);
            users.TryGetValue(order.ManagerId.ToString(), out var Manager);

            Result.Client = Client;
            Result.UserCreated = UserCreated;
            Result.UserUpdated = UserUpdated;
            Result.Manager = Manager;

            return Result;
        }

        public async Task<List<OrderWithProducts>> GetByShop(int ShopId)
        {
            List<Order> orders;
            if(ShopId == 0) orders = await _context.Orders.Where(n=>n.OrderStatus != OrderStatus.Finished || n.OrderStatus != OrderStatus.Canceled).ToListAsync();
            else orders = await _context.Orders.Where(n => n.OrderStatus != OrderStatus.Finished || n.OrderStatus != OrderStatus.Canceled).Where(n => n.ShopId == ShopId && n.ShopId == 0).ToListAsync();


            var Result = new List<OrderWithProducts>();
            var products = await _context.OrderProducts.Where(n => orders.Select(k => k.Id).Contains(n.OrderId)).ToListAsync();
            var userList = new List<string>();
            orders.ForEach(n => 
            {
                userList.Add(n.ClientId.ToString());
                if(n.UserCreated != null) userList.Add(n.UserCreated.ToString());
                if(n.UserUpdated != null) userList.Add(n.UserUpdated.ToString());
                if(n.ManagerId != null) userList.Add(n.ManagerId.ToString());
            });

            var users = await _identityClient.GetDictionary(userList);
            var payments = await _context.Payments.Where(n => orders.Select(n1 => n1.PaymentId).Contains(n.Id)).ToDictionaryAsync(n => n.Id, n => n);

            foreach (var order in orders)
            {
                users.TryGetValue(order.ClientId.ToString(), out var Client);
                if (Client == null) throw OrderErrors.ClientNotFound;
                users.TryGetValue(order.UserCreated.ToString(), out var UserCreated);
                users.TryGetValue(order.UserUpdated.ToString(), out var UserUpdated);
                users.TryGetValue(order.ManagerId.ToString(), out var Manager);
                payments.TryGetValue(order.PaymentId, out var Payment);

                var ent = new OrderWithProducts
                {
                    Order = order,
                    Products = products.Where(n => n.OrderId == order.Id).ToList(),
                    Client = Client,
                    UserCreated = UserCreated,
                    UserUpdated = UserUpdated,
                    Manager = Manager,
                    Payment = Payment
                };

                Result.Add(ent);
            }

            return Result;
        }

        public async Task<OrderWithProducts> PublicCreate(PublicCreateOrderDTO dto)
        {
            var client = await _identityClient.GetDictionary(new List<string> { dto.Order.ClientId.ToString() });
            if(client.Count < 1) throw OrderErrors.ClientNotFound;
            var order = new Order
            {
                ClientId = dto.Order.ClientId,
                DeliveryInfo = dto.Order.DeliveryInfo,
                DeliveryType = dto.Order.DeliveryType,
                DescriptionCilent = dto.Order.DescriptionCilent,
                DiscountId = dto.Order.DiscountId,
                OrderStatus = OrderStatus.Created,
                OrderType = OrderType.Retail,
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync(new CancellationToken());

            var productsData = (await _productClient.GetProductsByIdsArray(dto.Products.Select(n => n.ProductId).ToList())).ToDictionary(n=>n.Id, n=>n);

            var products = new List<OrderProduct>();
            foreach (var p in dto.Products)
            {
                var product = productsData[p.ProductId];
                products.Add(new OrderProduct
                {
                    CatalogKey = product.CatalogKey,
                    Discount = 0,
                    Description = p.Description,
                    Name = product.Name,
                    Price = product.RetailPrice,
                    ProductId = p.ProductId,
                    Quantity = p.Quantity,
                    QuantityUnitId = product.QuantityUnitId,
                    QuantityUnitName = product.QuantityUnitName,
                    SerialNumber = "",
                    Total = product.RetailPrice * p.Quantity - 0, 
                    OrderId = order.Id
                });
            }

            products.ForEach(n => n.OrderId = order.Id);

            order.TotalProductDiscount = products.Select(n => n.Discount).Sum();
            order.TotalProductsPrice = products.Select(n => n.Total).Sum();
            order.OrderDiscount = 0;
            order.TotalPrice = order.TotalProductsPrice - order.OrderDiscount;

            await _context.OrderProducts.AddRangeAsync(products);
            await _context.SaveChangesAsync(new CancellationToken());

            return await GetById(order.Id);
        }
    }
}
