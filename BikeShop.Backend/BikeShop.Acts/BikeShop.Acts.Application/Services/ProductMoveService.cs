using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Application.Refit;
using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.Requests.ProductMove;
using BikeShop.Acts.Domain.Entities;
using BikeShop.Acts.Domain.Enumerables;
using BikeShop.Products.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Services
{
    public class ProductMoveService : IProductMoveService
    {
        private readonly IApplicationDbContext _context;
        private readonly IProductClient _productClient;

        public ProductMoveService(IApplicationDbContext context, IProductClient productClient)
        {
            _context = context;
            _productClient = productClient;
        }

        public async Task<ProductMoveWithProducts> Create(ProductMoveCreateDTO dto)
        {
            var ent = new ProductMove { Description = dto.ProductMove.Description, MovingFromSkladId = dto.ProductMove.MovingFromSkladId, MovingToSkladId = dto.ProductMove.MovingToSkladId, Status = ProductMoveStatus.Created, UserCreated = dto.ProductMove.User, UserUpdated = dto.ProductMove.User };
            await _context.ProductMoves.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());

            var np = new List<ProductMoveProduct>();

            foreach (var p in dto.products)
            {
                var prod = new ProductMoveProduct();
                prod.ManufacturerBarcode = p.ManufacturerBarcode;
                prod.Barcode = p.Barcode;
                prod.ProductId = p.ProductId;
                prod.Name = p.Name;
                prod.Quantity = p.Quantity;
                prod.CatalogKey = p.CatalogKey;
                prod.QuantityUnitName = p.QuantityUnitName;
                prod.ProductMoveId = ent.Id;
                prod.Description = p.Description;

                np.Add(prod);
            }

            await _context.ProductMoveProducts.AddRangeAsync(np);
            await _context.SaveChangesAsync(new CancellationToken());

            return new ProductMoveWithProducts { ProductMove = ent, Products = np };
        }

        public async Task<ProductMoveWithProducts> Execute(int ActId, Guid User)
        {
            var ent = await _context.ProductMoves.FindAsync(ActId);
            if (ent == null) throw new Exception();
            if (ent.Status == ProductMoveStatus.Finished) throw new Exception();

            var prods = await _context.ProductMoveProducts.Where(n => n.ProductMoveId == ent.Id).Where(n=>n.Enabled == true).ToListAsync();

            await _productClient.AddProductsToStorage(prods.Select(n => new Domain.Refit.ProductQuantitySmplDTO { ProductId = n.ProductId, Quantity = n.Quantity * -1 }).ToList(),ent.MovingFromSkladId, "ProductMove", ent.Id);
            await _productClient.AddProductsToStorage(prods.Select(n => new Domain.Refit.ProductQuantitySmplDTO { ProductId = n.ProductId, Quantity = n.Quantity }).ToList(),ent.MovingToSkladId, "ProductMove", ent.Id);

            ent.Status = ProductMoveStatus.Finished;
            await _context.SaveChangesAsync(new CancellationToken());

            return new ProductMoveWithProducts { ProductMove = ent, Products = prods };
        }

        public async Task<List<ProductMoveWithProducts>> GetByShop(int ShopId, int Take)
        {
            var moves = await _context.ProductMoves.Where(n => n.MovingFromSkladId == ShopId || n.MovingToSkladId == ShopId).ToListAsync();
            var prods = await _context.ProductMoveProducts.Where(n=>moves.Select(m=>m.Id).Contains(n.ProductMoveId)).ToListAsync();

            var result = new List<ProductMoveWithProducts>();

            foreach (var move in moves)
            {
                result.Add(new ProductMoveWithProducts { ProductMove = move, Products = prods.Where(n => n.ProductMoveId == move.Id).ToList() });
            }

            return result;
        }

        public async Task<ProductMoveWithProducts> SetStatusToTransfer(int ActId, Guid User)
        {
            var ent = await _context.ProductMoves.FindAsync(ActId);
            if (ent == null) throw new Exception();
            if (ent.Status != ProductMoveStatus.Created) throw new Exception();

            var prods = await _context.ProductMoveProducts.Where(n => n.ProductMoveId == ent.Id).Where(n => n.Enabled == true).ToListAsync();
            
            ent.Status = ProductMoveStatus.InTransfer;
            await _context.SaveChangesAsync(new CancellationToken());

            return new ProductMoveWithProducts { ProductMove = ent, Products = prods };
        }

        public async Task<ProductMoveWithProducts> Update(ProductMoveUpdateDTO dto)
        {
            var ent = await _context.ProductMoves.FindAsync(dto.ProductMove.Id);
            if (ent == null) throw new Exception();
            if (ent.Status != ProductMoveStatus.Created) throw new Exception();

            ent.UpdatedAt = DateTime.Now;
            ent.UserUpdated = dto.ProductMove.User;
            ent.Description = dto.ProductMove.Description;
            ent.MovingFromSkladId = dto.ProductMove.MovingFromSkladId;
            ent.MovingToSkladId = dto.ProductMove.MovingToSkladId;

            var existProds = await _context.ProductMoveProducts.Where(n => n.ProductMoveId == ent.Id).ToDictionaryAsync(n=>n.Id, n=>n);
            var actualProds = new List<ProductMoveProduct>();
            var newProds = new List<ProductMoveProduct>();

            foreach (var prod in dto.products)
            {
                if (existProds.ContainsKey(prod.Id))
                {
                    var p = existProds[prod.Id];

                    p.Quantity = prod.Quantity;
                    p.ManufacturerBarcode = prod.ManufacturerBarcode;
                    p.Barcode = prod.Barcode;
                    p.ProductId = prod.ProductId;
                    p.CatalogKey = prod.CatalogKey;
                    p.Description = prod.Description;
                    p.Name = prod.Name;
                    p.QuantityUnitName = prod.QuantityUnitName;
                    p.UpdatedAt = DateTime.Now;
                    p.Description = p.Description;

                    actualProds.Add(p);
                    existProds.Remove(prod.Id);
                }
                else
                {
                    var p = new ProductMoveProduct();

                    p.Quantity = prod.Quantity;
                    p.ManufacturerBarcode = prod.ManufacturerBarcode;
                    p.Barcode = prod.Barcode;
                    p.ProductId = prod.ProductId;
                    p.CatalogKey = prod.CatalogKey;
                    p.Description = prod.Description;
                    p.Name = prod.Name;
                    p.QuantityUnitName = prod.QuantityUnitName;
                    p.ProductMoveId = ent.Id;
                    p.Description = p.Description;

                    actualProds.Add(p);
                    newProds.Add(p);
                }
            }

            _context.ProductMoveProducts.RemoveRange(existProds.Values);
            await _context.ProductMoveProducts.AddRangeAsync(newProds);
            await _context.SaveChangesAsync(new CancellationToken());

            return new ProductMoveWithProducts { ProductMove = ent, Products = actualProds };
        }
    }
}
