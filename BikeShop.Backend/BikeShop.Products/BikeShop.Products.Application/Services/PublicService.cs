using BikeShop.Products.Application.Common.Errors;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.ProductCard;
using BikeShop.Products.Domain.DTO.Requestes.Public;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.DTO.Responses.Public;
using BikeShop.Products.Domain.Entities;
using BikeShop.Products.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace BikeShop.Products.Application.Services
{
    public class PublicService : IPublicService
    {
        private readonly IApplicationDbContext _context;

        public PublicService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProductCardDTO> AddFavProducts(Guid ClientId, int ProductId)
        {
            if (await _context.ClientFavProducts.Where(n => n.ClientId == ClientId).Where(n => n.ProductId == ProductId).CountAsync() > 0) throw FavProdErrors.ProductAlreadyInFav;
            if (await _context.Products.FindAsync(ProductId) == null) throw FavProdErrors.ProductNotFount;

            await _context.ClientFavProducts.AddAsync(new ClientFavProduct { ClientId = ClientId, ProductId = ProductId });
            await _context.SaveChangesAsync(new CancellationToken());
            return await getProductCard(ProductId);
        }

        public async Task DelFavProducts(Guid ClientId, int ProductId)
        {
            var toRemove = _context.ClientFavProducts.Where(x => x.ClientId == ClientId && x.ProductId == ProductId);
            _context.ClientFavProducts.RemoveRange(toRemove);
            await _context.SaveChangesAsync(new CancellationToken());
        }

        public async Task<List<ProductCategory>> GetCategories()
        {
            var tags = await _context.ProductCategories.Where(n => n.Enabled != false)
                                                 .Where(n => n.IsRetailVisible == true)
                                                 .OrderBy(n => n.SortOrder)
                                                 .ToListAsync();
            return tags;
        }

        public async Task<List<ProductCardDTO>> GetFavProducts(Guid ClientId)
        {
            var prodIds = await _context.ClientFavProducts.Where(n => n.ClientId == ClientId).Select(n=>n.ProductId).ToListAsync();
            return prodIds.Select(n => getProductCard(n).Result).ToList();
        }

        public async Task<ProductCardDTO> getProductCard(int productId)
        {
            var binds = await _context.ProductBinds.Where(n => n.ProductId == productId).ToListAsync();
            var ids = new List<int> { productId };
            ids.AddRange(binds.Select(n => n.ChildrenId));
            var productBinds = await _context.Products.Where(n => ids.Contains(n.Id)).ToDictionaryAsync(n => n.Id, n => n);
            var card = await _context.ProductsCards.Where(n => n.ProductId == productId).FirstOrDefaultAsync();
            var options = await _context.ProductOptionVariantBinds.Where(n => ids.Contains(n.ProductId)).ToListAsync();
            var images = await _context.ProductImgs.Where(n => ids.Contains(n.ProductId)).ToListAsync();
            var category = await _context.ProductCategories.FindAsync(productBinds[productId].CategoryId);
            var quantity = await _context.Products.Where(n => ids.Contains(n.Id)).Join(_context.StorageProducts, n => n.Id, n1 => n1.ProductId, (n, n1) => new { productId = n.Id, storageId = n1.StorageId, quantity = n1.Quantity }).ToListAsync();
            var reserved = await _context.Products.Where(n => ids.Contains(n.Id)).Join(_context.ProductReservations, n => n.Id, n1 => n1.ProductId, (n, n1) => new { productId = n.Id, storageId = n1.StorageId, reserved = n1.Quantity }).ToListAsync();
            var quantList = ids.ToDictionary(n => n, n => quantity.Where(n1 => n1.productId == n).GroupBy(n1 => n1.storageId).Select(n1 => new { storageId = n1.Key, quantity = n1.Select(n1 => n1.quantity).Sum() }).ToDictionary(n1 => n1.storageId, n1 => n1.quantity));
            var reservList = ids.ToDictionary(n => n, n => reserved.Where(n1 => n1.productId == n).GroupBy(n1 => n1.storageId).Select(n1 => new { storageId = n1.Key, quantity = n1.Select(n1 => n1.reserved).Sum() }).ToDictionary(n1 => n1.storageId, n1 => n1.quantity));
            var Result = new ProductCardDTO();
            Result.product = productBinds[productId];
            Result.bindedProducts = productBinds.Values.ToList();
            Result.productCard = card;
            Result.productOptions = options;
            Result.productImages = images;
            Result.productCategory = category;
            Result.ProductStorageQuantity = quantList;
            Result.ProductStorageReserved = reservList;

            return Result;
        }

        public Task<PublicProductByCategoryResponse> GetProducts(PublicProductByCategoryRequest dto)
        {
            throw new NotImplementedException();
        }

        public Task<PublicProductSearchResponse> Serch(PublicProductSearchRequest dto)
        {
            throw new NotImplementedException();
        }
    }
}
