using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.Option;
using BikeShop.Products.Domain.DTO.Requestes.ProductCard;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.DTO.Responses.Option;
using BikeShop.Products.Domain.Entities;
using BikeShop.Products.Domain.Enums;
using Microsoft.EntityFrameworkCore;

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

        public async Task<OptionDTO> AddOptionVariant(int optionId, string name)
        {
            var option = await _context.Options.FindAsync(optionId);
            var variant = new OptionVariant { Name = name, OptionId = optionId, OptionName = option.Name };
            await _context.OptionVariants.AddAsync(variant);
            await _context.SaveChangesAsync(new CancellationToken());
            var variants = await _context.OptionVariants.Where(n => n.OptionId == optionId).ToListAsync();
            return new OptionDTO { Name = option.Name, Id = option.Id, CreatedAt = option.CreatedAt, Enabled = option.Enabled, UpdatedAt = option.UpdatedAt, optionVariants = variants };

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

        public async Task<List<ProductFilterDTO>> GetFiltersByProducts(List<int> ids)
        {
            var productVariants = await _context.ProductOptionVariantBinds.Where(n => ids.Contains(n.ProductId)).ToListAsync();
            var unicFilterNames = productVariants.Select(n => n.OptionName).Distinct();
            var unicVariantNames = productVariants.Select(n => n.Name).Distinct();
            var variantDict = unicVariantNames.ToDictionary(n => n, n => productVariants.Where(g => g.Name == n).Select(g=>g.ProductId).ToList());
            return unicFilterNames.Select(n=> new ProductFilterDTO { Name = n, Variants = productVariants.Where(g => g.OptionName == n).DistinctBy(h=>h.Name).Select(g=>new ProductFilterVatiantDTO { VariantName = g.Name, ProductIds = variantDict[g.Name] }).ToList() }).ToList();
        }

        public async Task<ProductCardDTO> GetProductCard(int productId)
        {
            return await _publicService.getProductCard(productId);
        }

        private static List<int> FindCommonElements(Dictionary<int, List<int>> data)
        {
            if (data == null || !data.Any())
            {
                return new List<int>();
            }

            // Start with the first list
            IEnumerable<int> common = data.First().Value;

            // Intersect with every other list
            foreach (var list in data.Skip(1))
            {
                common = common.Intersect(list.Value);
            }

            return common.ToList();
        }

        public async Task<ProductCatalogPageDTO> GetProductCardByCategory(ProductCardCatalogRequestDTO dto)
        {
            var category = await _context.ProductCategories.FindAsync(dto.CategoryId);

            var FilterVariants = await _context.ProductOptionVariantBinds.Where(n => dto.FiltersVariantIds.Contains(n.OptionVariantId)).ToListAsync();
            var OptinIds = FilterVariants.Select(n=>n.OptionVariantId).Distinct();
            var FilterArrays = OptinIds.ToDictionary(n => n, n => FilterVariants.Where(j => j.OptionVariantId == n).Select(j=>j.ProductId).ToList());
            var FiltersWhitelist = FindCommonElements(FilterArrays);
            
            //Получили все товары, которае подходят под категорию и ее потомков.
            var ProductsQuerry = _context.Products.Where(n => category.ChildrenIdsList.Contains(n.CategoryId)).Where(n=>n.IsMaster == true);
            //Если были указаны фильтры, фильтруем. 
            if (FiltersWhitelist.Count > 0) ProductsQuerry = ProductsQuerry.Where(n => FiltersWhitelist.Contains(n.Id));

            var ProductIds = ProductsQuerry.Select(n => n.Id);
            
            var StorageIds = await _context.Storages.Select(n => n.Id).ToListAsync();

            var StorageData = await _context.StorageProducts.Where(n => ProductIds.Contains(n.ProductId)).ToListAsync();
            var Product_StorageQuantity = ProductIds.ToDictionary(n => n, n => StorageIds.ToDictionary(g => g, g => StorageData.Where(j => j.ProductId == n).Where(j => j.StorageId == g).Select(k=>k.Quantity).Sum()));

            var ReservedData = await _context.ProductReservations.Where(n => ProductIds.Contains(n.ProductId)).ToListAsync();
            var Product_StorageReserved = ProductIds.ToDictionary(n => n, n => StorageIds.ToDictionary(g => g, g => ReservedData.Where(j => j.ProductId == n).Where(j => j.StorageId == g).Select(k => k.Quantity).Sum()));

            var Result = new ProductCatalogPageDTO();
            foreach (var i in dto.SortingSettings)
            {
                switch (Enum.Parse(typeof(ProductSortAction), i))
                {
                    case ProductSortAction.SortByStorageDescend:
                        
                        ProductsQuerry = ProductsQuerry.Join(_context.StorageProducts.Where(n=>n.StorageId == dto.StorageId), n=>n.Id, n1=>n1.ProductId, (n,n1)=>new { prod = n, quant = n1.Quantity }).OrderByDescending(n=>n.quant).Select(n=>n.prod);
                        Result.SortingSettings.Add(ProductSortAction.SortByStorageDescend.ToString());
                        break;
                    case ProductSortAction.SortByStorageAscend:
                        ProductsQuerry = ProductsQuerry.Join(_context.StorageProducts.Where(n => n.StorageId == dto.StorageId), n => n.Id, n1 => n1.ProductId, (n, n1) => new { prod = n, quant = n1.Quantity }).OrderBy(n => n.quant).Select(n => n.prod);
                        Result.SortingSettings.Add(ProductSortAction.SortByStorageAscend.ToString());
                        break;
                    default:
                        break;
                }
            }


            if (dto.Page != null) Result.Page = (int)dto.Page;
            if (dto.PageSize != null) Result.PageSize = (int)dto.PageSize;
            var Skip = (Result.Page - 1) * Result.PageSize;

            var Products = await ProductsQuerry.Skip(Skip).Take(Result.PageSize).ToListAsync();
            var ProdsFinishIds = Products.Select(n => n.Id);
            var TotalProducts = (decimal)(Products.Count);
            var div = TotalProducts / (decimal)Result.PageSize;
            Result.TotalPages = (int)Math.Ceiling(div);
            Result.StorageId = dto.StorageId;
            Result.TotalProducts = (int)TotalProducts;
            
            

            var cards = new List<ProductCardDTO>();

            var SlaveBinds = await _context.ProductBinds.Where(n => ProdsFinishIds.Contains(n.ProductId)).ToListAsync();
            var SlaveIds = SlaveBinds.Select(n1 => n1.ChildrenId);
            var SlaveProducts = await _context.Products.Where(n => SlaveIds.Contains(n.Id)).ToListAsync();

            var Cards = await _context.ProductsCards.Where(n => ProdsFinishIds.Contains(n.ProductId)).ToListAsync();
            
            var IdsAllProducts = new List<int>();
            IdsAllProducts.AddRange(ProdsFinishIds);
            IdsAllProducts.AddRange(SlaveIds);
            var AllOptionBinds = await _context.ProductOptionVariantBinds.Where(n => IdsAllProducts.Contains(n.ProductId)).ToListAsync();
            var AllImages = await _context.ProductImgs.Where(n => IdsAllProducts.Contains(n.ProductId)).ToListAsync();

            var variantIds = AllOptionBinds.Select(n => n.OptionVariantId).Distinct();
            Result.Options = await _context.OptionVariants.Where(n=>variantIds.Contains(n.Id)).ToListAsync();

            var prd = new List<ProductCardDTO>();
            foreach (var p in Products)
            {
                var card = new ProductCardDTO();
                card.product = p;

                var slaveIds = SlaveBinds.Where(n => n.ProductId == p.Id).Select(n => n.ChildrenId);
                var slaveProds = new List<Product> { p };
                slaveProds.AddRange(SlaveProducts.Where(n => slaveIds.Contains(n.Id)).ToList());
                card.bindedProducts = slaveProds;

                var allIds = new List<int> ();
                allIds.AddRange(slaveIds);
                allIds.Add(p.Id);

                card.productCard = Cards.Find(n => n.ProductId == p.Id);
                card.productOptions = AllOptionBinds.Where(n=>n.ProductId == p.Id).ToList();
                card.ProductStorageReserved = Product_StorageReserved.Where(n => allIds.Contains(n.Key)).ToDictionary(n => n.Key, n => n.Value);
                card.ProductStorageQuantity = Product_StorageQuantity.Where(n => allIds.Contains(n.Key)).ToDictionary(n => n.Key, n => n.Value);
                card.productCategory = category;
                card.productImages = AllImages.Where(n => slaveIds.Contains(n.ProductId)).ToList();

                prd.Add(card);
            }

            Result.Products = prd;

            return Result;
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
                List<int> onUpd = new List<int>();
                onUpd.AddRange(existProdBinds.Values.Select(n=>n.ChildrenId).ToList());
                onUpd.AddRange(newProdBinds.Select(n=>n.ChildrenId));
                onUpd.Add(product.Id);
                await UpdateIsMaster(onUpd);
                _context.ProductBinds.RemoveRange(existProdBinds.Values.ToList());
                await _context.ProductBinds.AddRangeAsync(newProdBinds);
            }

            
            await _context.SaveChangesAsync(new CancellationToken());

            return await GetProductCard(dto.Id);
        }

        private async Task UpdateIsMaster(List<int> ids)
        {
            ids = ids.Distinct().ToList();
            var prods = await _context.Products.Where(n => ids.Contains(n.Id)).ToListAsync();
            var binds = await _context.ProductBinds.Where(n=>ids.Contains(n.ProductId) || ids.Contains(n.ChildrenId)).ToListAsync();

            var masters = binds.Select(n => n.ProductId);
            var slaves = binds.Select(n => n.ChildrenId);
            foreach (var p in prods)
            {
                if(masters.Contains(p.Id)) p.IsMaster = true;
                if(slaves.Contains(p.Id)) p.IsMaster = false;
            }

            await _context.SaveChangesAsync(new CancellationToken());
        }
    }
}
