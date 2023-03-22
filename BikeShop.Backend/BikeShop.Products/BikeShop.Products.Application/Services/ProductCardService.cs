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

        public ProductCardService(IApplicationDbContext context, IPublicService publicService)
        {
            _context = context;
            _publicService = publicService;
        }

        public async Task<OptionDTO> CreateOption(CreateOptionDTO dto)
        {
            var option = new Option { Name = dto.name };
            await _context.Options.AddAsync(option);
            await _context.SaveChangesAsync(new CancellationToken());

            var variants = new List<OptionVariant>();
            foreach (var item in dto.variantNames)
            {
                variants.Add(new OptionVariant { Name = item, OptionName = dto.name, OptionId =  option.Id});
            }

            await _context.OptionVariants.AddRangeAsync(variants);
            await _context.SaveChangesAsync(new CancellationToken());

            return new OptionDTO { option = option, optionVariants = variants };
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
                dto.Add(new OptionDTO { option = option, optionVariants = optionVariants.Where(n=>n.OptionId == option.Id).ToList() });
            }

            return dto;
        }

        public async Task<List<Specification>> GetAllSpecifications()
        {
            return await _context.Specifications.Where(n => n.Enabled == true).ToListAsync();
        }

        public async Task<ProductCardDTO> GetProductCard(int productId)
        {
            var product = await _context.Products.FindAsync(productId);
            var list = new List<Product>{ product };

            return (await _publicService.getCards(list))[0];
        }

        public async Task<OptionDTO> UpdateOption(UpdateOptionDTO dto)
        {
            var ent = await _context.Options.FindAsync(dto.id);
            ent.Name = dto.name;
            ent.UpdatedAt = DateTime.Now;

            var variants = await _context.OptionVariants.Where(n => n.OptionId == dto.id).ToDictionaryAsync(n => n.Id, n => n);
            var list = new List<OptionVariant>();
            foreach (var variant in dto.variants)
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

            return new OptionDTO { option = ent, optionVariants = list };
        }

        public async Task<ProductCardDTO> UpdateProductCard(UpdateProductCardDTO dto)
        {
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
