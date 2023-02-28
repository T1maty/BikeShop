using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.Entities;
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
            var products = _context.Products.Where(n => prodQuantDict.ContainsKey(n.Id) || prodQuantReservedDict.ContainsKey(n.Id)).ToDictionary(n=>n.Id, n=>n);

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
    }
}
