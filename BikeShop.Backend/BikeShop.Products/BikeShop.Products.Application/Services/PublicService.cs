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
            var response = new List<ProductCardDTO>();
            foreach (var product in products)
            {
                response.Add(await getProductCard(product.Id));
            }
           
            return response;
        }

        public async Task<ProductCardDTO> getProductCard(int Id)
        {
            var result = new ProductCardDTO();

            var bind = await _context.ProductBinds.Where(n => n.ChildrenId == Id).FirstOrDefaultAsync();
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
            if(bind != null) result.bindedProducts = await _context.Products.Where(n=>slaveIds.Contains(n.Id)).ToListAsync();

            return result;
        }
    }
}
