﻿using BikeShop.Acts.Application.Refit;
using BikeShop.Payments.Application.Common.Errors;
using BikeShop.Payments.Application.Interfaces;
using BikeShop.Payments.Application.Refit;
using BikeShop.Payments.Domain.DTO.Refit;
using BikeShop.Payments.Domain.DTO.Requests.Order;
using BikeShop.Payments.Domain.DTO.Responses;
using BikeShop.Payments.Domain.Entities;
using BikeShop.Payments.Domain.Enumerables;
using BikeShop.Payments.Domain.Enumerables.PaymentEnums;
using BikeShop.Products.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BikeShop.Payments.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IApplicationDbContext _context;
        private readonly IProductClient _productClient;
        private readonly IIdentityClient _identityClient;
        private readonly IPaymentService _paymentService;

        public OrderService(IApplicationDbContext context, IProductClient productClient, IIdentityClient identityClient, IPaymentService paymentService)
        {
            _context = context;
            _productClient = productClient;
            _identityClient = identityClient;
            _paymentService = paymentService;
        }

        public async Task<OrderWithProducts> AddPayment(AddOrderPaymentDTO dto)
        {
            var UserIds = new List<string>();
            if (dto.UserId != null) UserIds.Add(dto.UserId.ToString());
            if (dto.ClientId != null) UserIds.Add(dto.ClientId.ToString());
            var users = await _identityClient.GetDictionary(UserIds);
            if (users.Count < 1) throw OrderErrors.UserNotFount;

            var order = await _context.Orders.FindAsync(dto.OrderId);
            if (order == null) throw OrderErrors.OrderNotFount;
            if (order.IsPayed) throw OrderErrors.PaymentAlreadyExist;

            order.UpdatedAt = DateTime.Now;

            if(dto.UserId!=null) order.UserUpdated = dto.UserId;
            else order.UserUpdated = dto.ClientId;


            var p = await _paymentService.NewPayment(new Domain.DTO.Requests.CreatePayment { Payment = dto.Payment, TargetId = order.Id, Target= PaymentTarget.Order.ToString(), ClientId = dto.ClientId, ShopId = order.ShopId, Source = PaymentSource.Shop.ToString(), UserId = dto.UserId  });
            order.PaymentId = p.Id;
            order.IsPayed = true;

            users.TryGetValue(dto.UserId != null ? dto.UserId.ToString():"", out var u);
            await UpdateOrderStatus(order.Id, u);

            await _context.SaveChangesAsync(new CancellationToken());
            return await GetById(order.Id);
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
            if (order.OrderStatus != OrderStatus.WaitingForCollection.ToString()) throw OrderErrors.WronStatus;
            order.UpdatedAt = DateTime.Now;
            order.UserUpdated = UserId;
            if (order.DeliveryType == DeliveryType.Pickup.ToString()) order.OrderStatus = OrderStatus.ReadyInShop.ToString();
            else order.OrderStatus = OrderStatus.WaitingForShipping.ToString();

            await _context.SaveChangesAsync(new CancellationToken());
            return await GetById(order.Id);
        }

        public async Task<OrderWithProducts> Confirm(Guid UserId, int OrderId)
        {
            var user = await _identityClient.GetDictionary(new List<string> { UserId.ToString() });
            if (user.Count < 1) throw OrderErrors.UserNotFount;
            var order = await _context.Orders.FindAsync(OrderId);
            if (order == null) throw OrderErrors.OrderNotFount;
            if (order.OrderStatus != OrderStatus.Created.ToString()) throw OrderErrors.WronStatus;

            order.UpdatedAt = DateTime.Now;
            order.UserUpdated = UserId;
            if (order.ManagerId == null) order.ManagerId = UserId;
            if (order.IsPrePay) order.OrderStatus = OrderStatus.WaitingForPayment.ToString();
            else order.OrderStatus = OrderStatus.WaitingForCollection.ToString();
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
            if (order.OrderStatus != OrderStatus.Shipped.ToString()) throw OrderErrors.WronStatus;

            order.UpdatedAt = DateTime.Now;
            order.UserUpdated = UserId;

            order.OrderStatus = OrderStatus.Finished.ToString();

            await _context.SaveChangesAsync(new CancellationToken());
            return await GetById(order.Id);
        }

        public async Task<OrderWithProducts> FullUpdate(FullUpdateOrderDTO dto)
        {
            //Находим заказ
            var order = await _context.Orders.FindAsync(dto.Id);
            if (order == null) throw OrderErrors.OrderNotFount;

            //Проверяем возможность изменений на текущем статусе заказа
            if (order.OrderStatus == OrderStatus.Finished.ToString() || order.OrderStatus == OrderStatus.Canceled.ToString()) throw OrderErrors.OrderStatusBlock;
            
            if (order.OrderStatus == OrderStatus.Shipped.ToString())
            {
                if(dto.DeliveryType!=null|| dto.DeliveryInfo != null || dto.DiscountId != null || dto.IsPrePay != null || dto.Products != null) throw OrderErrors.OrderStatusBlock;
            }
            
            if (order.OrderStatus == OrderStatus.ReadyInShop.ToString() || order.OrderStatus == OrderStatus.WaitingForShipping.ToString())
            {
                if (dto.DiscountId != null || dto.Products != null) throw OrderErrors.OrderStatusBlock;
            }

            if (order.IsPayed && dto.Products != null) throw OrderErrors.ProductUpdateBlock;
            if (order.IsPayed && dto.IsPrePay != null) throw OrderErrors.PrePayUpdateError;

            //Находим всех указаных юзеров, если хоть одного нету - ошибка
            var userIds = new List<string> { dto.UserId.ToString()} ;
            if (dto.ManagerId != null) userIds.Add(dto.ManagerId.ToString());
            userIds = userIds.Distinct().ToList();
            var users = await _identityClient.GetDictionary(userIds);
            if (users.Count != userIds.Count) throw OrderErrors.UserNotFount;
            
            order.UpdatedAt = DateTime.Now;
            order.UserUpdated = dto.UserId;

            //Обновление менегера
            if (dto.ManagerId != null) order.ManagerId = dto.ManagerId;

            //Обновление типа доставки
            if (dto.DeliveryType != null)
            {
                if (Enum.IsDefined(typeof(OrderDeliveryType), dto.DeliveryType))
                    order.DeliveryType = dto.DeliveryType;
                else throw OrderErrors.WronDeliveryType;
            }

            //Обновление информации о доставке с проверкой на корректность джейсон строки
            if (dto.DeliveryInfo != null)
            {
                if (JsonConvert.DeserializeObject(order.DeliveryInfo) != null)
                    order.DeliveryInfo = dto.DeliveryInfo;
                else throw OrderErrors.WronDeliveryType;
            }

            //Обновление параметра того, когда должен платить клиент
                
            if (dto.IsPrePay != null) order.IsPrePay = (bool)dto.IsPrePay;

            //Обновляем продукты
            var newProducts = await _productClient.GetProductsByIdsArray(dto.Products.Where(n=>n.Quantity > 0).Select(n=>n.ProductId).ToList());
            var existProducts = await _context.OrderProducts.Where(n => n.OrderId == order.Id).ToDictionaryAsync(n=>n.ProductId, n=>n);

            var toAdd = new List<OrderProduct>();
            var toRemove = existProducts.Values.ToList();

            var newProdData = dto.Products.ToDictionary(n => n.ProductId, n => n);

            foreach (var prod in newProducts)
            {
                var data = newProdData[prod.Id];

                if (existProducts.TryGetValue(prod.Id, out var existProd))
                {
                    //Update
                    existProd.UpdatedAt = DateTime.Now;
                    existProd.CatalogKey = prod.CatalogKey;
                    existProd.Price = prod.RetailPrice;
                    existProd.Description = data.Description;
                    existProd.Discount = 0;
                    existProd.Name = prod.Name;
                    existProd.Quantity = data.Quantity;
                    existProd.QuantityUnitId = prod.QuantityUnitId;
                    existProd.QuantityUnitName = prod.QuantityUnitName;
                    existProd.Total = prod.RetailPrice * data.Quantity - 0;

                    toRemove.Remove(existProd);
                }
                else
                {
                    //Create
                    var newProd = new OrderProduct 
                    {
                        CatalogKey = prod.CatalogKey,
                        Discount = 0,
                        Description = data.Description,
                        Name = prod.Name,
                        Price = prod.RetailPrice,
                        ProductId = prod.Id,
                        Quantity = data.Quantity,
                        QuantityUnitId = prod.QuantityUnitId,
                        QuantityUnitName = prod.QuantityUnitName,
                        SerialNumber = "",
                        Total = prod.RetailPrice * data.Quantity - 0,
                        OrderId = order.Id
                    };

                    toAdd.Add(newProd);
                }
            }

            _context.OrderProducts.RemoveRange(toRemove);
            await _context.OrderProducts.AddRangeAsync(toAdd);

            await _context.SaveChangesAsync(new CancellationToken());

            await UpdateOrderStatus(dto.Id, users[dto.UserId.ToString()]);

            return await GetById(dto.Id);
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
            var histories = await _context.OrderStatusHistories.Where(n => orders.Select(k => k.Id).Contains(n.OrderId)).ToListAsync();
            
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
                    Payment = Payment,
                    StatusHistories = histories.Where(n=>n.OrderId ==order.Id).ToList()
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
            Result.StatusHistories = await _context.OrderStatusHistories.Where(n => n.OrderId == order.Id).ToListAsync();

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
            if(ShopId == 0) orders = await _context.Orders.Where(n=>n.OrderStatus != OrderStatus.Finished.ToString() || n.OrderStatus != OrderStatus.Canceled.ToString()).ToListAsync();
            else orders = await _context.Orders.Where(n => n.OrderStatus != OrderStatus.Finished.ToString() || n.OrderStatus != OrderStatus.Canceled.ToString()).Where(n => n.ShopId == ShopId && n.ShopId == 0).ToListAsync();


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
            var histories = await _context.OrderStatusHistories.Where(n => orders.Select(k => k.Id).Contains(n.OrderId)).ToListAsync();

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
                    Payment = Payment,
                    StatusHistories = histories.Where(n => n.OrderId == order.Id).ToList()
                };

                Result.Add(ent);
            }

            return Result;
        }

        public async Task<OrderWithProducts> InternalCreate(InternalCreateOrderDTO dto)
        {
            var userIds = new List<string> { dto.UserId.ToString(), dto.ManagerId.ToString(), dto.ClientId.ToString() };
            userIds = userIds.Distinct().ToList();
            var users = await _identityClient.GetDictionary(userIds);
            if (users.Count != userIds.Count) throw OrderErrors.UserNotFount;

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
                OrderStatus = OrderStatus.Created.ToString(), OrderType = OrderType.FromShop,
                PaymentId = 0
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync(new CancellationToken());

            var FIO = users[dto.UserId.ToString()].lastName + " " + users[dto.UserId.ToString()].firstName + " " + users[dto.UserId.ToString()].patronymic;
            await _context.OrderStatusHistories.AddAsync(new OrderStatusHistory { OrderId = order.Id, OrderStatus = OrderStatus.Created.ToString(), UserId = dto.UserId, UserFIO = FIO });

            var products = (await _productClient.GetProductsByIdsArray(dto.Products.Select(n => n.ProductId).ToList())).ToDictionary(n => n.Id, n => n);

            await _context.OrderProducts.AddRangeAsync(dto.Products.Where(f=>f.Quantity > 0).Select(n => new OrderProduct 
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
                OrderStatus = OrderStatus.Created.ToString(),
                OrderType = OrderType.Retail,
            };

            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync(new CancellationToken());

            var FIO = client.First().Value.lastName + " " + client.First().Value.firstName + " " + client.First().Value.patronymic;
            await _context.OrderStatusHistories.AddAsync(new OrderStatusHistory { OrderId = order.Id, OrderStatus = OrderStatus.Created.ToString(), UserId = dto.Order.ClientId, UserFIO = FIO });

            var productsData = (await _productClient.GetProductsByIdsArray(dto.Products.Select(n => n.ProductId).ToList())).ToDictionary(n=>n.Id, n=>n);

            var products = new List<OrderProduct>();
            foreach (var p in dto.Products.Where(f => f.Quantity > 0))
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

        public Task<OrderWithProducts> Issue(Guid UserId, int OrderId)
        {
            throw new NotImplementedException();
        }

        public async Task<OrderWithProducts> Shipped(Guid UserId, int OrderId)
        {
            var user = await _identityClient.GetDictionary(new List<string> { UserId.ToString() });
            if (user.Count < 1) throw OrderErrors.UserNotFount;
            var order = await _context.Orders.FindAsync(OrderId);
            if (order == null) throw OrderErrors.OrderNotFount;
            if (order.OrderStatus != OrderStatus.WaitingForShipping.ToString()) throw OrderErrors.WronStatus;

            order.UpdatedAt = DateTime.Now;
            order.UserUpdated = UserId;

            order.OrderStatus = OrderStatus.Shipped.ToString();

            await _context.SaveChangesAsync(new CancellationToken());
            return await GetById(order.Id);
        }

        private async Task UpdateOrderStatus(int OrderId, User? user)
        {
            var Order = await _context.Orders.FindAsync(OrderId);
            if (Order == null) throw OrderErrors.OrderNotFount;

            var StatusHistories = await _context.OrderStatusHistories.Where(n => n.OrderId == OrderId).OrderByDescending(n=>n.CreatedAt).ToListAsync();

            var status = Enum.Parse(typeof(OrderStatus), Order.OrderStatus);
            var prevStatus = Enum.Parse(typeof(OrderStatus), StatusHistories.First().PreviousOrderStatus);


            if (!Order.IsPayed && Order.IsPrePay && (int)status > (int)OrderStatus.WaitingForPayment && (int)status < (int)OrderStatus.Finished)
            {
                var newStat = OrderStatus.WaitingForPayment;
                var FIO = user.lastName + " " + user.firstName + " " + user.patronymic;
                await _context.OrderStatusHistories.AddAsync(new OrderStatusHistory { OrderId = OrderId, OrderStatus = newStat.ToString(), PreviousOrderStatus = status.ToString(), UserId = user.id, UserFIO = FIO });
                await _context.SaveChangesAsync(new CancellationToken());
                return;
            }

            await _context.SaveChangesAsync(new CancellationToken());
        }
    }
}
