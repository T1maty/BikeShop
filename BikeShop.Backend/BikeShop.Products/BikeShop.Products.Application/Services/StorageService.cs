using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.Entities;
using BikeShop.Products.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Services
{
    public class StorageService : IStorageService
    {
        private readonly IApplicationDbContext _context;

        public StorageService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddProductsToStorage(List<ProductQuantitySmplDTO> products, int storageId, string source, int sourceId)
        {
            var prodsAsDict = products.ToDictionary(p => p.ProductId, n => n);
            var storageItems = _context.StorageProducts.Where(n=>n.StorageId == storageId).Where(n => prodsAsDict.Keys.Contains(n.ProductId)).ToDictionary(n=>n.ProductId, n=>n);
            var productsEntitiesDict = await _context.Products.Where(n => prodsAsDict.Keys.Contains(n.Id)).ToDictionaryAsync(n => n.Id, n => n);
            var newItems = new Dictionary<int, StorageProduct>();
            var newMoves = new Dictionary<int, ProductStorageMove>();
            foreach (var product in products)
            {
                if (storageItems.ContainsKey(product.ProductId))
                {
                    storageItems[product.ProductId].Quantity += product.Quantity;
                }
                else
                {
                    if (newItems.ContainsKey(product.ProductId))
                    {
                        newItems[product.ProductId].Quantity += product.Quantity;
                    }
                    else
                    {
                        newItems.Add(product.ProductId, new StorageProduct { ProductId = product.ProductId, Quantity = product.Quantity, StorageId = storageId });
                    }
                }


                if (newMoves.ContainsKey(product.ProductId))
                {
                    newMoves[product.ProductId].Quantity += product.Quantity;
                }
                else
                {
                    var prod = productsEntitiesDict[product.ProductId];
                    var productMove = new ProductStorageMove { ProductId = product.ProductId, CatalogKey = prod.CatalogKey, Enabled = prod.Enabled, MoveDirection = MoveDirection.Get(MoveDirectionEnum.MovingToStorage), PriceCurrencyId = 0, IncomePrice = prod.IncomePrice, ProductName = prod.Name, Quantity = product.Quantity, RetailPrice = prod.RetailPrice, StorageId = storageId, DealerPrice = prod.DealerPrice, QuantityUnitId = prod.QuantityUnitId, ProductMoveSource = ProductMoveSource.Get(ProductMoveSource.Get(source)), SourceId = sourceId };
                    newMoves.Add(product.ProductId, productMove);
                }
            }

            await _context.StorageProducts.AddRangeAsync(newItems.Values);
            await _context.ProductStorageMoves.AddRangeAsync(newMoves.Values);

            await _context.SaveChangesAsync(new CancellationToken());
        }

        public async Task<List<StorageProductsDTO>> GetByIds(List<int> Ids)
        {
            //Получаем все единицы измерения в виде словаря для дальнейшей быстрой привязки к товару.
            var QuantityUnits = _context.QuantityUnits.ToDictionary(n => n.Id, n => n);

            //Достаем все хранилище с нужными айдишниками товаров
            var allProducts = _context.StorageProducts.Where(n => Ids.Contains(n.ProductId));

            //Создаем список уникальных айдишников складов, на которых есть запрошенные товары
            var storagesList = allProducts.Select(n => n.StorageId).Distinct().ToList();
            //Подтягиваем сущности всех причясных складов
            var storages = _context.Storages.Where(n => storagesList.Contains(n.Id));

            //Получаем сущности всех нужных продуктов в виде словаря.
            //var products = _context.Products.Where(n => prodQuantDict.ContainsKey(n.Id) || prodQuantReservedDict.ContainsKey(n.Id)).ToDictionary(n => n.Id, n => n);
            
            var data = new List<StorageProductsDTO>();
            foreach (var storage in storages)
            {
                


                var skladDevided = new StorageProductsDTO { Storage = storage };
                
                
                
                data.Add(skladDevided);
            }

            
            

            return data;
        }

        public async Task<StorageProductsDTO> GetByStorage(int storageId)
        {
            //Получаем словари для всех товаров на складе, а так же зарезервированных товаров на складе.
            var prodQuantDict = await _context.StorageProducts.Where(n => n.StorageId == storageId).ToDictionaryAsync(n=>n.ProductId, n=>n.Quantity);
            var prodQuantReservedDict = await _context.ProductReservations.Where(n => n.StorageId == storageId).ToDictionaryAsync(n => n.ProductId, n => n.Quantity);
            
            //Получаем сущности всех нужных продуктов в виде словаря.
            var products = await _context.Products.Where(n => prodQuantDict.Keys.Contains(n.Id) || prodQuantReservedDict.Keys.Contains(n.Id)).ToDictionaryAsync(n=>n.Id, n=>n);

            //Получаем доступные товары отнимая от товаров на складе зарезервированные товары
            var prodQuantAvailableDict = prodQuantDict;
            foreach (var prod in prodQuantReservedDict)
            {
                prodQuantAvailableDict[prod.Key] -= prod.Value;
            }

            //Получаем все единицы измерения в виде словаря для дальнейшей быстрой привязки к товару.
            var QuantityUnits = _context.QuantityUnits.ToDictionary(n => n.Id, n => n);

            //Создаем списки доступных и зарезервированных продуктов
            var productQuantityDTOAvailable = prodQuantAvailableDict.Select(n => new ProductQuantityDTO { Product = products[n.Key], Quantity = n.Value, QuantityUnit = QuantityUnits[products[n.Key].QuantityUnitId] }).ToList();
            var productQuantityDTOReserved = prodQuantReservedDict.Select(n => new ProductQuantityDTO { Product = products[n.Key], Quantity = n.Value, QuantityUnit = QuantityUnits[products[n.Key].QuantityUnitId] }).ToList();

            //Сущность склада
            var storage = await _context.Storages.FindAsync(storageId);

            //Создаем сущность ответа, заполяем подготовленной информацией и возвращаем.
            return new StorageProductsDTO { Storage = storage, AvailableProducts = productQuantityDTOAvailable, ReservedProducts = productQuantityDTOReserved };

        }

        public async Task UpdateReservationProducts(List<ProductQuantitySmplDTO> OldReservationProducts, List<ProductQuantitySmplDTO> NewReservationProducts, int storageId)
        {
            var Reservation = await _context.ProductReservations.Where(n => n.StorageId == storageId).ToDictionaryAsync(n=>n.ProductId, n=>n);
            var quantitySum = new Dictionary<int, decimal>();
            var reservationToAdd = new List<ProductReservation>();

            if(OldReservationProducts != null)
            foreach (var product in OldReservationProducts)
            {
                if(quantitySum.ContainsKey(product.ProductId)) { quantitySum[product.ProductId] -= product.Quantity; }
                else { quantitySum.Add(product.ProductId, product.Quantity * -1);}
            }

            if (NewReservationProducts != null)
                foreach (var product in NewReservationProducts)
            {
                if (quantitySum.ContainsKey(product.ProductId)) { quantitySum[product.ProductId] += product.Quantity; }
                else { quantitySum.Add(product.ProductId, product.Quantity); }
            }
            
            foreach (var res in quantitySum) 
            {
                if (Reservation.ContainsKey(res.Key)) { Reservation[res.Key].Quantity += res.Value; Reservation[res.Key].UpdatedAt = DateTime.Now; }
                else { reservationToAdd.Add(new ProductReservation { Quantity = res.Value, ProductId = res.Key, StorageId = storageId }); }
            }

            await _context.ProductReservations.AddRangeAsync(reservationToAdd);
            await _context.SaveChangesAsync(new CancellationToken());
        }
    }
}
