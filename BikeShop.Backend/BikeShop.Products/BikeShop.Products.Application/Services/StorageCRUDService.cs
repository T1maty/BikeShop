using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Services
{
    public class StorageCRUDService : IStorageCRUDService
    {
        private readonly IApplicationDbContext _context;

        public StorageCRUDService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Storage> Create(CreateStorageDTO dto)
        {
            var storage = new Storage() { Name = dto.Name, SupplyDelay = dto.SupplyDelay, IsOutsource = dto.IsOutsource };
            await _context.Storages.AddAsync(storage);
            await _context.SaveChangesAsync(new CancellationToken());
            return storage;
        }

        public async Task<List<Storage>> Read()
        {
            return await _context.Storages.ToListAsync();
        }

        public async Task<Storage> Update(UpdateStorageDTO dto)
        {
            var storage = await _context.Storages.FindAsync(dto.Id);
            storage.Name = dto.Name;
            storage.IsOutsource = dto.IsOutsource;
            storage.SupplyDelay = dto.SupplyDelay;
            storage.Enabled = dto.Enabled;
            storage.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync(new CancellationToken());
            return storage;
        }
    }
}
