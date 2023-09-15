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

        public List<int> Get(List<int> parents, List<ProductCategory> data)
        {
            var childs = data.Where(n => parents.Contains(n.ParentId)).Select(n => n.Id).ToList();
            if(childs.Count > 0)childs.AddRange(Get(childs, data));
            return childs;
        }

        public async Task<List<Product>> GetProductsByCategory(int Id, int Take)
        {
            var tags = await _context.ProductCategories.ToListAsync();
            var allIds = Get(new List<int> { Id }, tags);
            allIds.Add(Id);

            return await _context.Products.Where(n=>allIds.Contains(n.CategoryId)).Take(Take).ToListAsync();
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
            ent.ProductId = dto.ProductId;
            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }

        public async Task<List<ProductQuantityDTO>> GetUnsorted(int srorageId)
        {
            var products = await _context.Products.Where(product => product.CategoryId < 1)
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
            if(dto.Category != null) ent.CategoryImport = dto.Category;
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
            if(dto.Category != null)prod.CategoryImport = dto.Category;

            prod.CatalogKey = dto.CatalogKey;
            prod.B2BVisibility = dto.B2BVisibility;
            prod.RetailVisibility = dto.RetailVisibility;
            prod.RetailPrice = dto.RetailPrice;
            prod.DealerPrice = dto.DealerPrice;
            prod.IncomePrice= dto.IncomePrice;
            prod.Name = dto.Name;
            prod.QuantityUnitId = 1;

            if(dto.CategoryId != null)
            {
                var cat = await _context.ProductCategories.FindAsync(dto.CategoryId);
                if (cat != null)
                {
                    prod.CategoryId = (int)dto.CategoryId;
                    prod.CategoryName = cat.Name;
                    prod.CategoryWay = cat.Way;
                }
            }

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

        public async Task AddArray(List<AddArrayProductDTO> dto)
        {
            var existKeys = await _context.Products.Select(n=>n.CatalogKey).ToListAsync();

            var newProds = dto.Where(n => !existKeys.Contains(n.catalog_key)).ToList();
            var existProds = dto.Where(n => existKeys.Contains(n.catalog_key)).Select(n=>n.catalog_key).ToList();

            var existProdsEnts = _context.Products.Where(n => existProds.Contains(n.CatalogKey));

            var newImgs = new List<ProductImg>();


            foreach (var i in existProdsEnts)
            {
                var temp = dto.Where(n => n.catalog_key == i.CatalogKey).FirstOrDefault();
                if (temp != null)
                i.CategoryImport = temp.category;

                newImgs.Add(new ProductImg { ProductId = i.Id, Url = temp.photo});
            }

            var products = new List<Product>();

            var barcodes = await _context.Products.Select(p => p.Barcode).ToArrayAsync();

            foreach (var p in newProds)
            {
                products.Add(new Product
                {
                     IncomePrice = decimal.Parse(p.price_in),
                     DealerPrice = decimal.Parse(p.price_out),
                     RetailPrice = decimal.Parse(p.price_out),
                      CatalogKey= p.catalog_key,
                      Name = p.name,
                      QuantityUnitName = "шт."
                });
            }

            await _context.Products.AddRangeAsync(products);
            await _context.SaveChangesAsync(new CancellationToken());

            var cards = new List<ProductCard>();

            foreach (var i in products)
            {
                var bc = GenerateUniqueBarcode(i.Id, barcodes);
                i.Barcode = bc;
                barcodes.Append(bc);

                var ent = dto.Where(n=>n.catalog_key ==i.CatalogKey).FirstOrDefault();

                cards.Add(new ProductCard { ProductId = i.Id, Description =  ent.description});

                newImgs.Add(new ProductImg { ProductId = i.Id, Url = ent.photo });
            }

            await _context.ProductImgs.AddRangeAsync(newImgs);
            await _context.ProductsCards.AddRangeAsync(cards);
            await _context.SaveChangesAsync(new CancellationToken());
        }

        public async Task<Product> GetByBarcode(string barcode)
        {
            var res = await _context.Products.FirstAsync(n => n.Barcode == barcode);
            if (res != null) return res;
            else return await _context.Products.FirstAsync(n => n.ManufacturerBarcode == barcode);
        }

        public async Task<Product> ChangeCategory(int ProductId, int CategoryId)
        {
            var ent = await _context.Products.FindAsync(ProductId);
            ent.CategoryId = CategoryId;
            ent.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }
    }
}
