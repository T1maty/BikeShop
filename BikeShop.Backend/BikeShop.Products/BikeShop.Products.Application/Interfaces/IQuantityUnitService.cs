using BikeShop.Products.Domain.DTO.Requestes.QuantityUnit;
using BikeShop.Products.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Interfaces
{
    public interface IQuantityUnitService
    {
        public Task<List<QuantityUnit>> GetAll();
        public Task<QuantityUnit> Create(CreateQuantityUnitDTO dto);
        public Task<QuantityUnit> Update(UpdateQuantityUnitDTO dto);
        public Task<List<QuantityUnitGroup>> GetAllGroups();
        public Task<QuantityUnitGroup> CreateGroup(CreateUnitGroupDTO dto);
        public Task<QuantityUnitGroup> UpdateGroup(UpdateUnitGroupDTO dto);
    }
}
