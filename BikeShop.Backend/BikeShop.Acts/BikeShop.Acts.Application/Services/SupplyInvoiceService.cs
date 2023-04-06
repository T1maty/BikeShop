using BikeShop.Acts.Application.Interfaces;
using BikeShop.Acts.Application.Refit;
using BikeShop.Acts.Domain.DTO;
using BikeShop.Acts.Domain.DTO.Requests.SupplyInvoice;
using BikeShop.Acts.Domain.Entities;
using BikeShop.Acts.Domain.Refit;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Service.Application.RefitClients;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Application.Services
{
    public class SupplyInvoiceService:ISupplyInvoiceService
    {
        private readonly IApplicationDbContext _context;
        private readonly IProductClient _productClient;
        private readonly IShopClient _shopClient;

        public SupplyInvoiceService(IApplicationDbContext context, IProductClient productClient, IShopClient shopClient)
        {
            _context = context;
            _productClient = productClient;
            _shopClient = shopClient;
        }

        public async Task<SupplyInvoiceWithProducts> Create(CreateSupplyInvoiceDTO dto)
        {
            var invoce = new SupplyInvoice();
            invoce.SypplyActStatus = "Created";
            invoce.ShopId = dto.SupplyInvoice.ShopId;
            invoce.UserCreatedId = dto.SupplyInvoice.User;
            invoce.UserUpdatedId = dto.SupplyInvoice.User;
            invoce.Description = dto.SupplyInvoice.Description;
            invoce.Total = 0;

            await _context.SupplyInvoices.AddAsync(invoce);
            await _context.SaveChangesAsync(new CancellationToken());

            var product = new List<SupplyInvoiceProduct>();

            foreach (var prod in dto.SupplyInvoiceProducts)
            {
                product.Add(new SupplyInvoiceProduct { SupplyInvoiceId = invoce.Id, BrandName = prod.BrandName, Description = prod.Description, ProductId = prod.ProductId, Barcode = prod.Barcode, CatalogKey = prod.CatalogKey, IncomePrice = prod.IncomePrice, ManufBarcode = prod.ManufBarcode, Name = prod.Name, Quantity = prod.Quantity, QuantityUnitName = prod.QuantityUnitName, Total = prod.Quantity * prod.IncomePrice });
            }


            invoce.Total = product.Select(n=>n.Total).Sum();
            await _context.SupplyInvoiceProducts.AddRangeAsync(product);
            await _context.SaveChangesAsync(new CancellationToken());

            return new SupplyInvoiceWithProducts { SupplyInvoice = invoce, SupplyInvoiceProducts = product };
        }

        public async Task Execute(int invoiceId, Guid userId)
        {
            var invoice = await _context.SupplyInvoices.FindAsync(invoiceId);
            invoice.UpdatedAt = DateTime.Now;
            invoice.UserUpdatedId = userId;
            invoice.SypplyActStatus = "Executed";

            var products = await _context.SupplyInvoiceProducts.Where(n=>n.SupplyInvoiceId == invoiceId).ToListAsync();
            var data = new List<ProductQuantitySmplDTO>();

            foreach (var prod in products)
            {
                data.Add(new ProductQuantitySmplDTO { ProductId = prod.Id, Quantity = prod.Quantity });
            }

            await _productClient.AddProductsToStorage(data, await _shopClient.GetStorageId(invoice.ShopId), "SupplyInvoice", invoiceId );
            await _context.SaveChangesAsync(new CancellationToken());
        }

        public async Task<List<SupplyInvoiceWithProducts>> GetByShop(int id, int take)
        {
            var result = new List<SupplyInvoiceWithProducts>();
            var invoices = await _context.SupplyInvoices.Where(n=>n.ShopId == id).Where(n=>n.Enabled == true).Take(take).ToListAsync();
            var invIds = invoices.Select(n=>n.Id).ToList();

            var invoceProducts = await _context.SupplyInvoiceProducts.Where(n => invIds.Contains(n.SupplyInvoiceId)).Where(n => n.Enabled == true).ToListAsync();

            foreach (var invoice in invoices)
            {
                result.Add(new SupplyInvoiceWithProducts { SupplyInvoice = invoice, SupplyInvoiceProducts = invoceProducts.Where(n=>n.SupplyInvoiceId == invoice.Id).ToList() });
            }

            return result;
        }
    }
}
