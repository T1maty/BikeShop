using BikeShop.Products.Application.Common.Exceptions;
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
    public class ProductService : IProductService
    {
        private readonly IApplicationDbContext _context;

        public ProductService(IApplicationDbContext context)
        {
            _context = context;

        }

        public async Task<List<Product>> GetProductsByIdsArray(List<int> Ids)
        {
            return await _context.Products.Where(n => Ids.Contains(n.Id)).ToListAsync();
        }

        public async Task<List<ProductQuantityDTO>> GetProductsByTags(string tagsIds, int storageId)
        {
            var ids = ProductService.GetTagListFromString(tagsIds);
            var products = await _context.Products.Where(n => ids.Contains(n.Id)).ToListAsync();
            var quantityUnits = await _context.QuantityUnits.ToDictionaryAsync(n=>n.Id, n=>n);
            var storage = await _context.StorageProducts.Where(n => n.StorageId == storageId).Where(n => products.Select(j => j.Id).Contains(n.ProductId)).ToDictionaryAsync(n=>n.ProductId, n=>n.Quantity);

            var res = new List<ProductQuantityDTO>();

            foreach (var prod in products)
            {
                res.Add(new ProductQuantityDTO { Product = prod , QuantityUnit = quantityUnits[prod.QuantityUnitId], Quantity = storage[prod.Id] });
            }

            return res;
        }

        private static List<int> GetTagListFromString(string tagsArrayStr)
        {
            // Список всех айди тэгов в виде чисел
            var tagList = new List<int>();
            // для перебора

            // Тэги будут переданы через запятую, сплитю по запятой
            foreach (var tagStr in tagsArrayStr.Split("-"))
            {
                // Пытаюсь спарсить строку тэга в число
                var isNumber = int.TryParse(tagStr, out var currentTag);
                // Если не число - 400
                if (!isNumber)
                    throw new InvalidFormatException($"Get products by tags error. Given invalid tags ({tagsArrayStr})")
                    {
                        Error = "tags_invalid",
                        ErrorDescription = "Invalid tags format. Correct example: getbytags/1-2-3-4-5",
                        ReasonField = "tagsIds"
                    };

                // Если один из тэгов число - добавляю его в результативный лист
                tagList.Add(currentTag);
            }

            // Если 0 тэгов перенесено - ошибка
            if (tagList.Count == 0)
                throw new InvalidFormatException($"Get products by tags error. Given invalid tags ({tagsArrayStr})")
                {
                    Error = "tags_invalid",
                    ErrorDescription = "Invalid tags format. Correct example: getbytags/1-2-3-4-5",
                    ReasonField = "tagsIds"
                };

            // Если все ок - возвращаю лист
            return tagList;
        }
    }
}
