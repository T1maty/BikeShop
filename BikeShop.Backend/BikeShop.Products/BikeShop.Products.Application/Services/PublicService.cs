using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.ProductCard;
using BikeShop.Products.Domain.DTO.Responses;
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
            var prods = await _context.TagToProductBinds.Where(n=>n.Enabled == true).Where(n=>ids.Contains(n.ProductTagId)).Include(n=>n.ProductTag).Where(n=>n.ProductTag.Enabled == true).Where(n => n.ProductTag.IsRetailVisible == true).Select(n=>n.ProductId).ToListAsync();
            var cards = new Dictionary<int,ProductCardDTO>();
            foreach (var item in prods)
            {
                if (!cards.ContainsKey(item))
                {
                    var card = await getProductCard(item);
                    if (!cards.ContainsKey(card.product.Id))
                    cards.Add(item, card);
                }
            }
            return cards.Values.ToList();
        }

        public async Task<List<ProductTag>> GetTags()
        {
            var tags = await _context.ProductTags.Where(n => n.Enabled != false)
                                                 .Where(n => n.IsRetailVisible == true)
                                                 .OrderBy(n => n.SortOrder)
                                                 .ToListAsync();
            return tags;
        }

        public async Task<List<Product>> Serch(string querry)
        {
            var res = querry.ToLower().Split(" ");
            var contQR = _context.Products.Where(n => n.Enabled == true).Where(n=>n.RetailVisibility == true);
            foreach (var item in res)
            {
                contQR = contQR.Where(n => n.Name.ToLower().Contains(item)
                                        || n.Id.ToString().Contains(item)
                                        || n.CatalogKey.ToLower().Contains(item)
                                        || n.Barcode.ToLower().Contains(item)
                                        || n.ManufacturerBarcode.ToLower().Contains(item));
            }

            return await contQR.Take(10).ToListAsync();
        }

        public async Task<List<ProductCardDTO>> getCards(List<Product> products)
        {
            var response = new Dictionary<int,ProductCardDTO>();
            foreach (var product in products)
            {
                var card = await getProductCard(product.Id);
                if (!response.ContainsKey(card.product.Id))
                response.Add(card.product.Id,card);
            }
           
            return response.Values.ToList();
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
            result.productTags = await _context.TagToProductBinds.Where(n => slaveIds.Contains(n.ProductId)).Include(n=>n.ProductTag).Select(n=>new ProductTagBindDTO { ProductTag = n.ProductTag, ProductId = n.ProductId, Id = n.Id }).ToListAsync();
            if(bind != null) result.bindedProducts = await _context.Products.Where(n=>slaveIds.Contains(n.Id)).ToListAsync();
            if(bind == null) result.bindedProducts = new List<Product> { result.product };
 
            return result;
        }
    }
}
