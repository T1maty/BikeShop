using BikeShop.Products.Application.Interfaces;
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
    public class PublicService : IPublicService
    {
        private readonly IApplicationDbContext _context;

        public PublicService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProductCardDTO>> DefaultProducts(int Quantity)
        {
            
            var products = await _context.Products.Where(n => n.Enabled == true)
                                                  .Where(n=>n.RetailVisibility == true)
                                                  .Where(n=>n.CheckStatus != ProductCheckStatus.Get(ProductCheckStatusEnum.JustCreatedByScript))
                                                  .Take(Quantity)
                                                  .ToListAsync();
            return await getCards(products);
        }

        public async Task<List<ProductCardDTO>> GetProducts(List<int> ids)
        {
            throw new NotImplementedException();
        }

        public async Task<List<ProductTag>> GetTags()
        {
            var tags = await _context.ProductTags.Where(n => n.Enabled != false)
                                                 .Where(n => n.IsRetailVisible == true)
                                                 .OrderBy(n => n.SortOrder)
                                                 .ToListAsync();
            return tags;
        }

        public async Task Serch()
        {
            throw new NotImplementedException();
        }

        public async Task<List<ProductCardDTO>> getCards(List<Product> products)
        {
            var productIds = products.Select(n => n.Id).ToList();
            var response = new List<ProductCardDTO>();

            var productCards = await _context.ProductsCards.Where(n => n.Enabled == true).Where(n => productIds.Contains(n.ProductId)).ToDictionaryAsync(n => n.ProductId, n => n);
            var productSpecifications = await _context.ProductSpecifications.Where(n => n.Enabled == true).Where(n => productIds.Contains(n.ProductId)).OrderBy(n => n.SortOrder).ToListAsync();
            var productOptions = await _context.ProductOptionVariantBinds.Where(n => n.Enabled == true).Where(n => productIds.Contains(n.ProductId)).OrderBy(n => n.SortOrder).ToListAsync();
            var productImages = await _context.ProductImgs.Where(n => n.Enabled == true).Where(n => productIds.Contains(n.ProductId)).OrderBy(n=>n.SortOrder).ToListAsync();
            var productTags = await _context.TagToProductBinds.Where(n => n.Enabled == true).Where(n => productIds.Contains(n.ProductId)).Include(n=>n.ProductTag).ToListAsync();

            foreach (var product in products)
            {
                response.Add(new ProductCardDTO
                {
                    product = product,
                    productCard = productCards.ContainsKey(product.Id) ? productCards[product.Id] : null,
                    productOptions = productOptions.Where(n => n.ProductId == product.Id).ToList(),
                    productSpecifications = productSpecifications.Where(n => n.ProductId == product.Id).ToList(),
                    productImages = productImages.Where(n => n.ProductId == product.Id).ToList(),
                    productTags = productTags.Where(n=>n.ProductId == product.Id).Select(n=>n.ProductTag).ToList()
                });;
            }

            return response;
        }
    }
}
