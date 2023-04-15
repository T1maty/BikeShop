using BikeShop.Products.Application.Common.Exceptions;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Application.RefitClients;
using BikeShop.Products.Domain.DTO.Requestes.ProductCard;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace BikeShop.Products.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IApplicationDbContext _context;
        private readonly IFileServiceClient _fileServiceClient;

        public ProductService(IApplicationDbContext context, IFileServiceClient fileServiceClient)
        {
            _context = context;
            _fileServiceClient = fileServiceClient;
        }

        public async Task<List<Product>> GetProductsByIdsArray(List<int> Ids)
        {
            return await _context.Products.Where(n => Ids.Contains(n.Id)).ToListAsync();
        }

        public async Task<List<ProductQuantityDTO>> GetProductsByTags(string tagsIds, int storageId)
        {
            var ids = ProductService.GetTagListFromString(tagsIds);

            var productsIds = await _context.TagToProductBinds.Where(bind => ids.Contains(bind.ProductTagId))
            .Select(bind => bind.ProductId).ToListAsync();

            var products = await _context.Products.Where(product => productsIds.Contains(product.Id))
            .ToListAsync();

            var quantityUnits = await _context.QuantityUnits.ToDictionaryAsync(n=>n.Id, n=>n);
            var storage = await _context.StorageProducts.Where(n => n.StorageId == storageId).Where(n => products.Select(j => j.Id).Contains(n.ProductId)).ToDictionaryAsync(n=>n.ProductId, n=>n.Quantity);

            var res = new List<ProductQuantityDTO>();

            foreach (var prod in products)
            {
                res.Add(new ProductQuantityDTO { 
                    Product = prod ,
                    QuantityUnit = prod.QuantityUnitId==0?null:quantityUnits[prod.QuantityUnitId], 
                    Quantity = storage.ContainsKey(prod.Id)?storage[prod.Id]:0 });
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

        public async Task<ProductImg> AddImageToProduct(int productId, IFormFile imageFile)
        {
            var img = new ProductImg() { ProductId = productId, SortOrder = 0 };
            await _context.ProductImgs.AddAsync(img);
            await _context.SaveChangesAsync(new CancellationToken());

            var stream = imageFile.OpenReadStream();
            var streamPart = new StreamPart(stream, imageFile.FileName, "image/jpeg");

            var url = await _fileServiceClient.AddImageToCloud( img.Id, streamPart);
            img.Url = url;
            await _context.SaveChangesAsync(new CancellationToken());
            return img;
        }

        public async Task DeleteImage(int imageId)
        {
            _context.ProductImgs.Remove(await _context.ProductImgs.FindAsync(imageId));
            await _context.SaveChangesAsync(new CancellationToken());
        }

        public async Task<ProductImg> UpdateImage(ProductImageDTO dto)
        {
            var ent = await _context.ProductImgs.FindAsync(dto.Id);
            ent.SortOrder = dto.SortOrder;
            ent.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }

        public async Task<List<ProductQuantityDTO>> GetUnsorted(int srorageId)
        {
            var ids = _context.TagToProductBinds.Select(n => n.ProductId);
            var products = await _context.Products.Where(product => !ids.Contains(product.Id))
            .ToListAsync();

            var quantityUnits = await _context.QuantityUnits.ToDictionaryAsync(n => n.Id, n => n);
            var storage = await _context.StorageProducts.Where(n => n.StorageId == srorageId).Where(n => products.Select(j => j.Id).Contains(n.ProductId)).ToDictionaryAsync(n => n.ProductId, n => n.Quantity);

            var res = new List<ProductQuantityDTO>();

            foreach (var prod in products)
            {
                res.Add(new ProductQuantityDTO
                {
                    Product = prod,
                    QuantityUnit = prod.QuantityUnitId == 0 ? null : quantityUnits[prod.QuantityUnitId],
                    Quantity = storage.ContainsKey(prod.Id) ? storage[prod.Id] : 0
                });
            }

            return res;
        }
    }
}
