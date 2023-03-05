using BikeShop.Products.Domain.DTO.Requestes;
using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Interfaces
{
    public interface IStorageCRUDService
    {
        public Task<Storage> Create(CreateStorageDTO dto);
        public Task<Storage> Update(UpdateStorageDTO dto);
        public Task<List<Storage>> Read();
    }
}
