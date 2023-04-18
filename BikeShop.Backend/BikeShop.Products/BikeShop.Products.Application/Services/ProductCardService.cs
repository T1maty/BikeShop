using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.DTO.Requestes.Option;
using BikeShop.Products.Domain.DTO.Requestes.ProductCard;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.DTO.Responses.Option;
using BikeShop.Products.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Services
{
    public class ProductCardService : IProductCardService
    {
        private readonly IApplicationDbContext _context;
        private readonly IPublicService _publicService;
        private readonly IProductService _productService;

        public ProductCardService(IApplicationDbContext context, IPublicService publicService, IProductService productService)
        {
            _context = context;
            _publicService = publicService;
            _productService = productService;
        }

        public async Task<OptionDTO> CreateOption(CreateOptionDTO dto)
        {
            var option = new Option { Name = dto.name };
            await _context.Options.AddAsync(option);
            await _context.SaveChangesAsync(new CancellationToken());

            var variants = new List<OptionVariant>();
            foreach (var item in dto.optionVariants)
            {
                variants.Add(new OptionVariant { Name = item, OptionName = dto.name, OptionId =  option.Id});
            }

            await _context.OptionVariants.AddRangeAsync(variants);
            await _context.SaveChangesAsync(new CancellationToken());

            return new OptionDTO { Name = option.Name, Id = option.Id, CreatedAt = option.CreatedAt, Enabled = option.Enabled, UpdatedAt = option.UpdatedAt, optionVariants = variants };
        }

        public async Task<Specification> CreateSpecification(string name)
        {
            var ent = new Specification { Name = name };
            await _context.Specifications.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());

            return ent;
        }

        public async Task<List<OptionDTO>> GetAllOptions()
        {
            var dto = new List<OptionDTO>();
            var options = await _context.Options.Where(n => n.Enabled == true).ToListAsync();
            var optionVariants = await _context.OptionVariants.Where(n => options.Select(n1 => n1.Id).Contains(n.OptionId)).ToListAsync();

            foreach (var option in options)
            {
                dto.Add(new OptionDTO { Name = option.Name, Id = option.Id, CreatedAt = option.CreatedAt, Enabled = option.Enabled, UpdatedAt = option.UpdatedAt, optionVariants = optionVariants.Where(n=>n.OptionId == option.Id).ToList() });
            }

            return dto;
        }

        public async Task<List<Specification>> GetAllSpecifications()
        {
            return await _context.Specifications.Where(n => n.Enabled == true).ToListAsync();
        }

        public async Task<ProductCardDTO> GetProductCard(int productId)
        {
            return await _publicService.getProductCard(productId);
        }

        public async Task<OptionDTO> UpdateOption(UpdateOptionDTO dto)
        {
            var ent = await _context.Options.FindAsync(dto.id);
            ent.Name = dto.name;
            ent.UpdatedAt = DateTime.Now;

            var variants = await _context.OptionVariants.Where(n => n.OptionId == dto.id).ToDictionaryAsync(n => n.Id, n => n);
            var list = new List<OptionVariant>();
            foreach (var variant in dto.optionVariants)
            {
                if (variants.ContainsKey(variant.id))
                {
                    var src = variants[variant.id];
                    src.Name = variant.name;
                    src.Enabled = variant.enabled;
                    src.UpdatedAt= DateTime.Now;
                    src.OptionName = ent.Name;

                    list.Add(src);
                    variants.Remove(variant.id);
                }
                else
                {
                    var newEnt = new OptionVariant { Enabled = variant.enabled, Name = variant.name, OptionId = ent.Id, OptionName = ent.Name };
                    list.Add(newEnt);
                    await _context.OptionVariants.AddAsync(newEnt);
                }
            }

            _context.OptionVariants.RemoveRange(variants.Select(n => n.Value));
            await _context.SaveChangesAsync(new CancellationToken());

            return new OptionDTO { Name = ent.Name, Id = ent.Id, CreatedAt = ent.CreatedAt, Enabled = ent.Enabled, UpdatedAt = ent.UpdatedAt, optionVariants = list };
        }

        public async Task<ProductCardDTO> UpdateProductCard(UpdateProductCardDTO dto)
        {
            var allOptions = await _context.Options.ToDictionaryAsync(n => n.Id, n => n);
            var allVariants = await _context.OptionVariants.ToDictionaryAsync(n => n.Id, n => n);
            var allSpecifications = await _context.Specifications.ToDictionaryAsync(n => n.Id, n => n);


            var product = await _context.Products.FindAsync(dto.Id);
            var productCard = await _context.ProductsCards.Where(n => n.ProductId == dto.Id).FirstOrDefaultAsync();

            product.CheckStatus = dto.CheckStatus;
            productCard.Description = dto.productCard.description;
            productCard.DescriptionShort = dto.productCard.shortDescription;

            var bind = await _context.ProductBinds.Where(n => n.ChildrenId == dto.Id).FirstOrDefaultAsync();
            //slaves contains master id
            List<int> slaveIds = new List<int> { dto.Id };
            if (bind != null)
            {
                slaveIds = await _context.ProductBinds.Where(n => n.ProductId == bind.ProductId).Select(n => n.ChildrenId).ToListAsync();
            }

            var vIds = dto.productOptions.Select(n1 => n1.id);
            var variantBinds = await _context.ProductOptionVariantBinds.Where(n => vIds.Contains(n.Id)).ToDictionaryAsync(n=>n.Id, n=>n);

            var newBinds = new List<ProductOptionVariantBind>();

            foreach (var variant in dto.productOptions)
            {
                if (variant.id != 0)
                {
                    //Редактирум все существующие бинды
                    var ent = variantBinds[variant.id];
                    ent.SortOrder = variant.SortOrder;
                    ent.Enabled = variant.enabled;
                    ent.UpdatedAt = DateTime.Now;
                }
                else
                {
                    //Создаем новые бинды
                    var vari = allVariants[variant.OptionVariantId];
                    var opt = allOptions[vari.OptionId];
                    newBinds.Add(new ProductOptionVariantBind {OptionVariantId = variant.OptionVariantId, ProductId = variant.productId, SortOrder = variant.SortOrder, Name = vari.Name, OptionId = opt.Id, OptionName = opt.Name});
                }
            }

            //Добавляем новые бинды
            await _context.ProductOptionVariantBinds.AddRangeAsync(newBinds);

            //Удаляем все бинды у товара, которых нету.
            var forRemove = _context.ProductOptionVariantBinds.Where(n => slaveIds.Contains(n.ProductId)).Where(n => !vIds.Contains(n.Id));
            _context.ProductOptionVariantBinds.RemoveRange(forRemove);


            var specIds = dto.productSpecifications.Select(n => n.id);
            var prodSpecifications = await _context.ProductSpecifications.Where(n => specIds.Contains(n.Id)).ToDictionaryAsync(n=>n.Id, n=>n);
            var newSpecs = new List<ProductSpecification>();

            foreach (var sp in dto.productSpecifications)
            {
                if(sp.id != 0)
                {
                    //Редактируем существующие спецификации
                    var ent = prodSpecifications[sp.id];
                    ent.Description = sp.Description;
                    ent.SortOrder = sp.SortOrder;
                    ent.UpdatedAt = DateTime.Now;
                    ent.Enabled = sp.Enabled;
                }
                else
                {
                    //Добавляем в список новые спецификации
                    newSpecs.Add(new ProductSpecification { Description = sp.Description, Enabled = sp.Enabled, Name = allSpecifications[sp.SpecificationId].Name, SortOrder = sp.SortOrder, SpecificationId = sp.SpecificationId, ProductId = dto.Id });
                }
            }

            
            if (dto.bindedProducts.Count == 1)
            {
                _context.ProductBinds.RemoveRange(_context.ProductBinds.Where(n => n.ProductId == dto.Id));
            }
            else
            {
                var existProdBinds = await _context.ProductBinds.Where(n => n.ProductId == dto.Id).ToDictionaryAsync(n => n.ChildrenId, n => n);
                List<ProductBind> newProdBinds = new List<ProductBind>();

                foreach (var prod in dto.bindedProducts)
                {
                    if (!existProdBinds.ContainsKey(prod.Id))
                    {
                        newProdBinds.Add(new ProductBind { ProductId = product.Id, ChildrenId = prod.Id });
                        existProdBinds.Remove(prod.Id);
                    }
                    else
                    {
                        existProdBinds.Remove(prod.Id);
                    }
                }
                _context.ProductBinds.RemoveRange(existProdBinds.Values.ToList());
                await _context.ProductBinds.AddRangeAsync(newProdBinds);
            }

            

            //Добавляем новые спецификаии
            await _context.ProductSpecifications.AddRangeAsync(newSpecs);
            
            //Удаляем лишние спецификации
            var forRemoveSpecs = _context.ProductSpecifications.Where(n => n.ProductId == dto.Id).Where(n => !specIds.Contains(n.Id));
            _context.ProductSpecifications.RemoveRange(forRemoveSpecs);


            var atbIDs = await _context.TagToProductBinds.Where(n => slaveIds.Contains(n.ProductId)).ToDictionaryAsync(n=>n.Id, n=>n);
            var newTagBinds = new List<TagToProductBind>();
            
            foreach (var tagBinds in dto.productTags)
            {
                if (atbIDs.ContainsKey(tagBinds.Id))
                {
                    atbIDs.Remove(tagBinds.Id);
                }
                else
                {
                    newTagBinds.Add(new TagToProductBind { ProductId = tagBinds.ProductId, ProductTagId = tagBinds.ProductTag.Id });
                }
            }

            _context.TagToProductBinds.RemoveRange(atbIDs.Values);
            await _context.TagToProductBinds.AddRangeAsync(newTagBinds);
            await _context.SaveChangesAsync(new CancellationToken());

            return new ProductCardDTO();
        }

        public async Task<Specification> UpdateSpecification(UpdateSpecificationDTO dto)
        {
            var ent = await _context.Specifications.FindAsync(dto.id);

            ent.Name = dto.name;
            ent.Enabled = dto.enabled;
            ent.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync(new CancellationToken());

            return ent;
        }
    }
}
