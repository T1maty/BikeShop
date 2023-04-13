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
            
            var productImages = await _context.ProductImgs.Where(n => n.Enabled == true).Where(n => productIds.Contains(n.ProductId)).OrderBy(n=>n.SortOrder).ToListAsync();
            var productTags = await _context.TagToProductBinds.Where(n => n.Enabled == true).Where(n => productIds.Contains(n.ProductId)).Include(n=>n.ProductTag).ToListAsync();

            var bindKeys = await _context.ProductBinds.Where(n => productIds.Contains(n.ChildrenId)).Select(n=>n.ProductId).Distinct().ToListAsync();
            var bindedIds = await _context.ProductBinds.Where(n => bindKeys.Contains(n.ProductId)).ToDictionaryAsync(n=>n.ChildrenId, n=>n);
            var bindedProducts = await _context.Products.Where(n => bindedIds.Select(n=>n.Key).Contains(n.Id)).ToListAsync();

            var productOptions = await _context.ProductOptionVariantBinds.Where(n => n.Enabled == true).Where(n => bindedIds.Select(n => n.Key).Contains(n.ProductId)).OrderBy(n => n.SortOrder).ToListAsync();

            foreach (var product in products)
            {
                var binded = bindedIds.Where(n => n.Value.ProductId == bindedIds[product.Id].ProductId).Where(n => n.Value.ChildrenId != product.Id).Select(n => n.Value.ChildrenId);
                response.Add(new ProductCardDTO
                {
                    product = product,
                    productCard = productCards.ContainsKey(product.Id) ? productCards[product.Id] : null,
                    productOptions = productOptions.Where(n => binded.Contains(n.ProductId)|| n.ProductId == product.Id).ToList(),
                    productSpecifications = productSpecifications.Where(n => n.ProductId == bindedIds[product.Id].ProductId).ToList(),
                    productImages = productImages.Where(n => n.ProductId == product.Id).ToList(),
                    productTags = productTags.Where(n=>n.ProductId == product.Id).Select(n=>n.ProductTag).ToList(),

                    bindedProducts = bindedProducts.Where(n1=> binded.Contains(n1.Id)).ToList()
                });;
            }

            return response;
        }

        public async Task<ProductCardDTO> getProductCard(int Id)
        {
            var result = new ProductCardDTO();

            var bind = await _context.ProductBinds.Where(n => n.ChildrenId == Id).FirstAsync();
            int masterId = Id;
            //slaves contains master id
            List<int> slaveIds = new List<int> { Id };
            if (bind != null)
            {
                masterId = bind.ProductId;
                slaveIds = await _context.ProductBinds.Where(n => n.ProductId == masterId).Select(n => n.ChildrenId).ToListAsync();
            }

            result.product = await _context.Products.FindAsync(masterId);
            result.productCard = await _context.ProductsCards.Where(n=>n.ProductId == masterId).FirstOrDefaultAsync();
            result.productOptions = await _context.ProductOptionVariantBinds.Where(n => slaveIds.Contains(n.ProductId)).ToListAsync();
            result.productSpecifications = await _context.ProductSpecifications.Where(n => n.ProductId == masterId).ToListAsync();
            result.productImages = await _context.ProductImgs.Where(n => slaveIds.Contains(n.ProductId)).ToListAsync();
            result.productTags = await _context.TagToProductBinds.Where(n => slaveIds.Contains(n.ProductId)).Include(n=>n.ProductTag).Select(n=>n.ProductTag).Distinct().ToListAsync();
            result.bindedProducts = await _context.Products.Where(n=>slaveIds.Contains(n.Id)).ToListAsync();

            return result;
        }
    }
}
