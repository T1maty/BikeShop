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

        public Task<OrderWithProducts> AddPayment(Guid UserId, int OrderId)
        {
            throw new NotImplementedException();
        }

        public Task<OrderWithProducts> Cancel(Guid UserId, int OrderId)
        {
            throw new NotImplementedException();
        }

        public async Task<OrderWithProducts> Collected(Guid UserId, int OrderId)
        {
            var user = await _identityClient.GetDictionary(new List<string> { UserId.ToString() });
            if (user.Count < 1) throw OrderErrors.UserNotFount;
            var order = await _context.Orders.FindAsync(OrderId);
            if (order == null) throw OrderErrors.OrderNotFount;
            if (order.OrderStatus != OrderStatus.WaitingForCollection) throw OrderErrors.WronStatus;
            order.UpdatedAt = DateTime.Now;
            order.UserUpdated = UserId;
            if (order.DeliveryType == DeliveryType.Pickup.ToString()) order.OrderStatus = OrderStatus.ReadyInShop;
            else order.OrderStatus = OrderStatus.WaitingForShipping;

            await _context.SaveChangesAsync(new CancellationToken());
            return await GetById(order.Id);
        }

        public async Task<OrderWithProducts> Confirm(Guid UserId, int OrderId)
        {
            var user = await _identityClient.GetDictionary(new List<string> { UserId.ToString() });
            if (user.Count < 1) throw OrderErrors.UserNotFount;
            var order = await _context.Orders.FindAsync(OrderId);
            if (order == null) throw OrderErrors.OrderNotFount;
            if (order.OrderStatus != OrderStatus.Created) throw OrderErrors.WronStatus;

            order.UpdatedAt = DateTime.Now;
            order.UserUpdated = UserId;
            if (order.ManagerId == null) order.ManagerId = UserId;
            if (order.IsPrePay) order.OrderStatus = OrderStatus.WaitingForPayment;
            else order.OrderStatus = OrderStatus.WaitingForCollection;
            order.ShopId = user[UserId.ToString()].shopId;

            await _context.SaveChangesAsync(new CancellationToken());
            return await GetById(order.Id);
        }

        public async Task<OrderWithProducts> Delivered(Guid UserId, int OrderId)
        {
            var user = await _identityClient.GetDictionary(new List<string> { UserId.ToString() });
            if (user.Count < 1) throw OrderErrors.UserNotFount;
            var order = await _context.Orders.FindAsync(OrderId);
            if (order == null) throw OrderErrors.OrderNotFount;
            if (order.OrderStatus != OrderStatus.Shipped) throw OrderErrors.WronStatus;

            order.UpdatedAt = DateTime.Now;
            order.UserUpdated = UserId;

            order.OrderStatus = OrderStatus.Finished;

            await _context.SaveChangesAsync(new CancellationToken());
            return await GetById(order.Id);
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
            Result.Order = order;
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

        public async Task<OrderWithProducts> InternalCreate(InternalCreateOrderDTO dto)
        {
            
            var order = new Order { 
                ShopId = dto.ShopId, 
                DeliveryType = dto.DeliveryType,
                DeliveryInfo = dto.DeliveryInfo,
                DiscountId = dto.DiscountId,
                IsPrePay = dto.IsPrePay,
                IsPayed = false,
                UserCreated = dto.UserId, UserUpdated = dto.UserId,
                ClientId= dto.ClientId, ManagerId = dto.ManagerId,
                DescriptionCilent = dto.DescriptionCilent, 
                OrderDiscount = 0, TotalPrice = 0, TotalProductDiscount = 0, TotalProductsPrice = 0,
                OrderStatus = OrderStatus.Created, OrderType = OrderType.FromShop,
                PaymentId = 0
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync(new CancellationToken());

            var products = (await _productClient.GetProductsByIdsArray(dto.Products.Select(n => n.ProductId).ToList())).ToDictionary(n => n.Id, n => n);

            await _context.OrderProducts.AddRangeAsync(dto.Products.Select(n => new OrderProduct 
            {
                 CatalogKey = products[n.ProductId].CatalogKey,
                  ProductId= n.ProductId, Description = n.Description, 
                Discount = 0, Quantity = n.Quantity, Price = products[n.ProductId].RetailPrice,
                 Name= products[n.ProductId].Name, OrderId = order.Id, QuantityUnitId = products[n.ProductId].QuantityUnitId, QuantityUnitName = products[n.ProductId].QuantityUnitName, SerialNumber = "",
                  Total = products[n.ProductId].RetailPrice * n.Quantity - 0
            }));

            await _context.SaveChangesAsync(new CancellationToken());

            return await GetById(order.Id);
        }

        public Task<OrderWithProducts> Issue(Guid UserId, int OrderId)
        {
            throw new NotImplementedException();
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

        public async Task<OrderWithProducts> Shipped(Guid UserId, int OrderId)
        {
            var user = await _identityClient.GetDictionary(new List<string> { UserId.ToString() });
            if (user.Count < 1) throw OrderErrors.UserNotFount;
            var order = await _context.Orders.FindAsync(OrderId);
            if (order == null) throw OrderErrors.OrderNotFount;
            if (order.OrderStatus != OrderStatus.WaitingForShipping) throw OrderErrors.WronStatus;

            order.UpdatedAt = DateTime.Now;
            order.UserUpdated = UserId;

            order.OrderStatus = OrderStatus.Shipped;

            await _context.SaveChangesAsync(new CancellationToken());
            return await GetById(order.Id);
        }
    }
}
