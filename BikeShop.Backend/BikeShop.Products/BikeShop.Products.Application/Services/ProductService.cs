using BikeShop.Products.Application.Common.Errors;
using BikeShop.Products.Application.Common.Exceptions;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Application.RefitClients;
using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.DTO.Requestes.Product;
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
using System.Transactions;
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

        public async Task<List<Product>> GetProductsByTags(string tagsIds, int Take)
        {
            var ids = ProductService.GetTagListFromString(tagsIds);

            var productsIds = await _context.TagToProductBinds.Where(bind => ids.Contains(bind.ProductTagId))
            .Select(bind => bind.ProductId).ToListAsync();

            var products = await _context.Products.Where(product => productsIds.Contains(product.Id))
            .ToListAsync();

            return products;
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

        public async Task<Product> UpdatePrices(UpdateProductPriceDTO dto)
        {
            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null) throw Errors.ProductNotFount;

            var hist = new PriceHistory { OldDealerPrice = product.DealerPrice, OldIncomePrice = product.IncomePrice, OldRetailPrice = product.RetailPrice, NewRetailPrice = dto.RetailPrice, NewDealerPrice = dto.DealerPrice, NewIncomePrice = dto.IncomePrice, ProductId = dto.ProductId, UserChangedId = dto.User };

            product.DealerPrice = dto.DealerPrice;
            product.IncomePrice = dto.IncomePrice;
            product.RetailPrice = dto.RetailPrice;
            product.UpdatedAt = DateTime.Now;

            await _context.PriceHistories.AddAsync(hist);
            await _context.SaveChangesAsync(new CancellationToken());

            return product;
        }

        public async Task<List<Product>> Search(string querry)
        {
            var res = querry.ToLower().Split(" ");
            var contQR = _context.Products.Where(n=>n.Enabled == true);
            foreach ( var item in res ) 
            {
                contQR = contQR.Where(n => n.Name.ToLower().Contains(item)
                                        || n.Id.ToString().Contains(item)
                                        || n.CatalogKey.ToLower().Contains(item)
                                        || n.Barcode.ToLower().Contains(item)
                                        || n.ManufacturerBarcode.ToLower().Contains(item));
            }

            return await contQR.Take(10).ToListAsync();
        }

        public async Task<Product> Update(UpdateProductDTO dto)
        {
            var ent = await _context.Products.FindAsync(dto.Id);
            if (ent == null) throw new Exception();

            ent.Name = dto.Name;
            ent.CatalogKey = dto.CatalogKey;
            if(dto.Category != null) ent.Category = dto.Category;
            if(dto.ManufacturerBarcode != null) ent.ManufacturerBarcode = dto.ManufacturerBarcode;
            ent.RetailVisibility = dto.RetailVisibility;
            ent.B2BVisibility = dto.B2BVisibility;
            ent.UserUpdated = dto.User;
            ent.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }

        public async Task<Product> Create(CreateProductDTO dto)
        {
            var prod = new Product();

            prod.UserCreated = dto.User;
            prod.UserUpdated = dto.User;

            if(dto.ManufacturerBarcode != null)dto.ManufacturerBarcode = dto.ManufacturerBarcode;
            if(dto.Category != null)dto.Category = dto.Category;

            prod.CatalogKey = dto.CatalogKey;
            prod.B2BVisibility = dto.B2BVisibility;
            prod.RetailVisibility = dto.RetailVisibility;
            prod.RetailPrice = dto.RetailPrice;
            prod.DealerPrice = dto.DealerPrice;
            prod.IncomePrice= dto.IncomePrice;
            prod.Name = dto.Name;
            prod.QuantityUnitId = 1;

            var unit = await _context.QuantityUnits.FindAsync(1);
            if (unit == null) throw new Exception();

            prod.QuantityUnitName = unit.Name;

            await _context.Products.AddAsync(prod);
            await _context.SaveChangesAsync(new CancellationToken());
            
            // Гененирую уникальный баркод для продукта
            var barcodes = await _context.Products.Select(p => p.Barcode).ToArrayAsync();
            var newBarcode = GenerateUniqueBarcode(prod.Id, barcodes);
            prod.Barcode = newBarcode;

            await _context.ProductsCards.AddAsync(new ProductCard { ProductId = prod.Id, Description = "", DescriptionShort = "" });

            if(dto.TagId != 0 && dto.TagId != null)
            {
                await _context.TagToProductBinds.AddAsync(new TagToProductBind { ProductId = prod.Id, ProductTagId = (int)dto.TagId });
            }

            await _context.SaveChangesAsync(new CancellationToken());

            return prod;
        }

        private static string GenerateUniqueBarcode(int productId, string[] existBarcodes)
        {
            var temp = productId.ToString();
            while (temp.Length < 12) temp += '0';

            var sum = 0;

            for (var i = temp.Length; i >= 1; i--)
            {
                var digit = Convert.ToInt32(temp.Substring(i - 1, 1));
                if (i % 2 == 0) sum += digit * 3;
                else sum += digit * 1;
            }

            var checkSum = (10 - sum % 10) % 10;

            var barcode = temp + checkSum;

            var counter = 0;
            while (existBarcodes.Contains(barcode))
            {
                counter++;
                var lenght = counter.ToString().Length;
                temp = barcode.Remove(12 - lenght, lenght + 1) + counter;

                var sum1 = 0;

                for (var i = temp.Length; i >= 1; i--)
                {
                    var digit = Convert.ToInt32(temp.Substring(i - 1, 1));
                    if (i % 2 == 0) sum1 += digit * 3;
                    else sum1 += digit * 1;
                }

                var checkSum1 = (10 - (sum1 % 10)) % 10;

                barcode = temp + checkSum1;
            }

            return barcode;
        }
    }
}
