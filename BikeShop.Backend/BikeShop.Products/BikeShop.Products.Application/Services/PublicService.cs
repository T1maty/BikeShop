using BikeShop.Products.Application.Common.Errors;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.ProductCard;
using BikeShop.Products.Domain.DTO.Requestes.Public;
using BikeShop.Products.Domain.DTO.Responses;
using BikeShop.Products.Domain.DTO.Responses.ProductCart;
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

        public async Task<ProductCartResponse?> AddToCart(Guid ClientId, int ProductId, decimal Quantity)
        {
            if (await _context.Products.FindAsync(ProductId) == null) throw FavProdErrors.ProductNotFount;
            var toRemove = _context.ClientCartProducts.Where(n => n.ClientId == ClientId).Where(n => n.ProductId == ProductId);
            _context.ClientCartProducts.RemoveRange(toRemove);
            if (Quantity > 0)
            {
                await _context.ClientCartProducts.AddAsync(new ClientCartProduct { ClientId = ClientId, Quantity = Quantity, ProductId = ProductId });
                await _context.SaveChangesAsync(new CancellationToken());
                return new ProductCartResponse { Product = getProductCard(ProductId).Result, Quantity = Quantity };

            }
            await _context.SaveChangesAsync(new CancellationToken());
            return null;
        }

        public async Task DelFavProducts(Guid ClientId, int ProductId)
        {
            var toRemove = _context.ClientFavProducts.Where(x => x.ClientId == ClientId && x.ProductId == ProductId);
            _context.ClientFavProducts.RemoveRange(toRemove);
            await _context.SaveChangesAsync(new CancellationToken());
        }

        public async Task<List<ProductCartResponse>> GetCart(Guid ClientId)
        {
            var cart = await _context.ClientCartProducts.Where(n => n.ClientId == ClientId).ToListAsync();

            return cart.Select(n => new ProductCartResponse { Quantity = n.Quantity, Product = getProductCard(n.ProductId).Result }).ToList();
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

        public async Task<PublicProductByCategoryResponse> GetProducts(PublicProductByCategoryRequest dto)
        {
            var category = await _context.ProductCategories.FindAsync(dto.CategoryId);

            var FilterVariants = await _context.ProductOptionVariantBinds.Where(n => dto.FiltersVariantIds.Contains(n.OptionVariantId)).ToListAsync();
            var OptinIds = FilterVariants.Select(n => n.OptionVariantId).Distinct();
            var FilterArrays = OptinIds.ToDictionary(n => n, n => FilterVariants.Where(j => j.OptionVariantId == n).Select(j => j.ProductId).ToList());
            var FiltersWhitelist = FindCommonElements(FilterArrays);

            //Получили все товары, которае подходят под категорию и ее потомков.
            List<int> allCatids = category.ChildrenIdsList.Select(n => n).ToList();
            allCatids.Add(category.Id);
            var ProductsQuerry = _context.Products.Where(n => allCatids.Contains(n.CategoryId)).Where(n => n.IsMaster == true);
            //Если были указаны фильтры, фильтруем. 
            if (FiltersWhitelist.Count > 0) ProductsQuerry = ProductsQuerry.Where(n => FiltersWhitelist.Contains(n.Id));

            var ProductIds = ProductsQuerry.Select(n => n.Id);

            var StorageIds = await _context.Storages.Select(n => n.Id).ToListAsync();

            var StorageData = await _context.StorageProducts.Where(n => ProductIds.Contains(n.ProductId)).ToListAsync();
            var Product_StorageQuantity = ProductIds.ToDictionary(n => n, n => StorageIds.ToDictionary(g => g, g => StorageData.Where(j => j.ProductId == n).Where(j => j.StorageId == g).Select(k => k.Quantity).Sum()));

            var ReservedData = await _context.ProductReservations.Where(n => ProductIds.Contains(n.ProductId)).ToListAsync();
            var Product_StorageReserved = ProductIds.ToDictionary(n => n, n => StorageIds.ToDictionary(g => g, g => ReservedData.Where(j => j.ProductId == n).Where(j => j.StorageId == g).Select(k => k.Quantity).Sum()));

            var Result = new PublicProductByCategoryResponse();
            foreach (var i in dto.SortingSettings)
            {
                switch (Enum.Parse(typeof(ProductSortAction), i))
                {
                    case ProductSortAction.SortByStorageDescend:

                        ProductsQuerry = ProductsQuerry.Join(_context.StorageProducts.Where(n => n.StorageId == dto.StorageId), n => n.Id, n1 => n1.ProductId, (n, n1) => new { prod = n, quant = n1.Quantity }).OrderByDescending(n => n.quant).Select(n => n.prod);
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
            var TotalProducts = (decimal)(await ProductsQuerry.CountAsync());
            var div = TotalProducts / (decimal)Result.PageSize;
            Result.TotalPages = (int)Math.Ceiling(div);
            Result.StorageId = dto.StorageId;
            Result.TotalProducts = (int)TotalProducts;
            Result.FilterSettings = OptinIds.ToList();



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
            Result.Options = await _context.OptionVariants.Where(n => variantIds.Contains(n.Id)).ToListAsync();

            var prd = new List<ProductCardDTO>();
            foreach (var p in Products)
            {
                var card = new ProductCardDTO();
                card.product = p;

                var slaveIds = SlaveBinds.Where(n => n.ProductId == p.Id).Select(n => n.ChildrenId);
                var slaveProds = new List<Product> { p };
                slaveProds.AddRange(SlaveProducts.Where(n => slaveIds.Contains(n.Id)).ToList());
                card.bindedProducts = slaveProds;

                var allIds = new List<int>();
                allIds.AddRange(slaveIds);
                allIds.Add(p.Id);

                card.productCard = Cards.Find(n => n.ProductId == p.Id);
                card.productOptions = AllOptionBinds.Where(n => n.ProductId == p.Id).ToList();
                card.ProductStorageReserved = Product_StorageReserved.Where(n => allIds.Contains(n.Key)).ToDictionary(n => n.Key, n => n.Value);
                card.ProductStorageQuantity = Product_StorageQuantity.Where(n => allIds.Contains(n.Key)).ToDictionary(n => n.Key, n => n.Value);
                card.productCategory = category;
                card.productImages = AllImages.Where(n => allIds.Contains(n.ProductId)).ToList();

                prd.Add(card);
            }

            Result.Products = prd;

            return Result;
        }

        public async Task<PublicProductSearchResponse> Serch(PublicProductSearchRequest dto)
        {
            var FilterVariants = await _context.ProductOptionVariantBinds.Where(n => dto.FiltersVariantIds.Contains(n.OptionVariantId)).ToListAsync();
            var OptinIds = FilterVariants.Select(n => n.OptionVariantId).Distinct();
            var FilterArrays = OptinIds.ToDictionary(n => n, n => FilterVariants.Where(j => j.OptionVariantId == n).Select(j => j.ProductId).ToList());
            var FiltersWhitelist = FindCommonElements(FilterArrays);

            var res = dto.Querry.ToLower().Split(" ");
            var ProductsQuerry = _context.Products.Where(n => n.IsMaster == true);
            foreach (var item in res)
            {
                ProductsQuerry = ProductsQuerry.Where(n => n.Name.ToLower().Contains(item)
                                        || n.Id.ToString().Contains(item)
                                        || n.CatalogKey.ToLower().Contains(item)
                                        || n.Barcode.ToLower().Contains(item)
                                        || n.ManufacturerBarcode.ToLower().Contains(item));
            }

            //Если были указаны фильтры, фильтруем. 
            if (FiltersWhitelist.Count > 0) ProductsQuerry = ProductsQuerry.Where(n => FiltersWhitelist.Contains(n.Id));

            var ProductIds = ProductsQuerry.Select(n => n.Id);

            var StorageIds = await _context.Storages.Select(n => n.Id).ToListAsync();

            var StorageData = await _context.StorageProducts.Where(n => ProductIds.Contains(n.ProductId)).ToListAsync();
            var Product_StorageQuantity = ProductIds.ToDictionary(n => n, n => StorageIds.ToDictionary(g => g, g => StorageData.Where(j => j.ProductId == n).Where(j => j.StorageId == g).Select(k => k.Quantity).Sum()));

            var ReservedData = await _context.ProductReservations.Where(n => ProductIds.Contains(n.ProductId)).ToListAsync();
            var Product_StorageReserved = ProductIds.ToDictionary(n => n, n => StorageIds.ToDictionary(g => g, g => ReservedData.Where(j => j.ProductId == n).Where(j => j.StorageId == g).Select(k => k.Quantity).Sum()));

            var Result = new PublicProductSearchResponse();
            foreach (var i in dto.SortingSettings)
            {
                switch (Enum.Parse(typeof(ProductSortAction), i))
                {
                    case ProductSortAction.SortByStorageDescend:

                        ProductsQuerry = ProductsQuerry.Join(_context.StorageProducts.Where(n => n.StorageId == dto.StorageId), n => n.Id, n1 => n1.ProductId, (n, n1) => new { prod = n, quant = n1.Quantity }).OrderByDescending(n => n.quant).Select(n => n.prod);
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
            var TotalProducts = (decimal)(await ProductsQuerry.CountAsync());
            var div = TotalProducts / (decimal)Result.PageSize;
            Result.TotalPages = (int)Math.Ceiling(div);
            Result.StorageId = dto.StorageId;
            Result.TotalProducts = (int)TotalProducts;
            Result.FilterSettings = OptinIds.ToList();



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
            Result.Options = await _context.OptionVariants.Where(n => variantIds.Contains(n.Id)).ToListAsync();

            var allCatsIds = Products.Select(n => n.CategoryId);
            var allCats = await _context.ProductCategories.Where(n => allCatsIds.Contains(n.Id)).ToDictionaryAsync(n => n.Id, n => n);

            var prd = new List<ProductCardDTO>();
            foreach (var p in Products)
            {
                var card = new ProductCardDTO();
                card.product = p;

                var slaveIds = SlaveBinds.Where(n => n.ProductId == p.Id).Select(n => n.ChildrenId);
                var slaveProds = new List<Product> { p };
                slaveProds.AddRange(SlaveProducts.Where(n => slaveIds.Contains(n.Id)).ToList());
                card.bindedProducts = slaveProds;

                var allIds = new List<int>();
                allIds.AddRange(slaveIds);
                allIds.Add(p.Id);

                card.productCard = Cards.Find(n => n.ProductId == p.Id);
                card.productOptions = AllOptionBinds.Where(n => n.ProductId == p.Id).ToList();
                card.ProductStorageReserved = Product_StorageReserved.Where(n => allIds.Contains(n.Key)).ToDictionary(n => n.Key, n => n.Value);
                card.ProductStorageQuantity = Product_StorageQuantity.Where(n => allIds.Contains(n.Key)).ToDictionary(n => n.Key, n => n.Value);
                allCats.TryGetValue(p.CategoryId, out var c);
                card.productCategory = c;
                card.productImages = AllImages.Where(n => allIds.Contains(n.ProductId)).ToList();

                prd.Add(card);
            }

            Result.Products = prd;

            return Result;
        }
    }
}
