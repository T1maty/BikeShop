using AutoMapper;
using BikeShop.Products.Application.Common.Errors;
using BikeShop.Products.Application.Common.Exceptions;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.DTO.Requestes.QuantityUnit;
using BikeShop.Products.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Products.Application.Services
{
    public class QuantityUnitService : IQuantityUnitService
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public QuantityUnitService(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<QuantityUnit> Create(CreateQuantityUnitDTO dto)
        {
            if (_context.QuantityUnits.Select(n => n.Name.ToLower()).Contains(dto.Name.ToLower())) throw Errors.DuplicateQuantityUnitName;
            if (_context.QuantityUnits.Select(n => n.FullName.ToLower()).Contains(dto.FullName.ToLower())) throw Errors.DuplicateQuantityUnitFullName;

            var quantityUnit = new QuantityUnit { Name = dto.Name, FullName = dto.FullName, GroupId = dto.GroupId, IsDefaultInGroup = dto.IsDefaultInGroup, IsSplittable = dto.IsSplittable, IsSwitchable = dto.IsSwitchable, BaseCoeficient = dto.BaseCoeficient };

            var group = await _context.QuantityUnitGroups.FindAsync(quantityUnit.GroupId);

            if (group == null) throw Errors.QuantityGroupNotFound;

            if (quantityUnit.IsDefaultInGroup)
            {
                quantityUnit.GroupName = group.Name;
                quantityUnit.BaseCoeficient = 1;
                await _context.QuantityUnits.Where(n => n.GroupId == dto.GroupId).ForEachAsync(n=>n.IsDefaultInGroup = false);
            }
            
            await _context.QuantityUnits.AddAsync(quantityUnit);
            await _context.SaveChangesAsync(new CancellationToken());

            return quantityUnit;
        }

        public async Task<QuantityUnitGroup> CreateGroup(CreateUnitGroupDTO dto)
        {
            if (_context.QuantityUnitGroups.Select(n => n.Name.ToLower()).Contains(dto.Name.ToLower())) throw Errors.DuplicateQuantityGroupName;

            var ent = new QuantityUnitGroup() { Name = dto.Name };
            await _context.QuantityUnitGroups.AddAsync(ent);
            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }

        public async Task<List<QuantityUnit>> GetAll()
        {
            return await _context.QuantityUnits.ToListAsync();
        }

        public async Task<List<QuantityUnitGroup>> GetAllGroups()
        {
            return await _context.QuantityUnitGroups.ToListAsync();
        }

        public async Task<QuantityUnit> Update(UpdateQuantityUnitDTO dto)
        {
            var ent = await _context.QuantityUnits.FindAsync(dto.Id);

            if (ent == null) throw Errors.IdNotFound;

            if (_context.QuantityUnits.Select(n => n.Name.ToLower()).Contains(dto.Name.ToLower()) && ent.Name != dto.Name) throw Errors.DuplicateQuantityUnitName;
            if (_context.QuantityUnits.Select(n => n.FullName.ToLower()).Contains(dto.FullName.ToLower()) && ent.FullName != dto.FullName) throw Errors.DuplicateQuantityUnitFullName;

            ent.Name = dto.Name;
            ent.FullName = dto.FullName;
            ent.IsDefaultInGroup = dto.IsDefaultInGroup;
            ent.IsSwitchable = dto.IsSwitchable;
            ent.IsSplittable = dto.IsSplittable;
            ent.BaseCoeficient = dto.BaseCoeficient;
            ent.Enabled = dto.Enabled;
            ent.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync(new CancellationToken());

            return ent;
        }

        public async Task<QuantityUnitGroup> UpdateGroup(UpdateUnitGroupDTO dto)
        {
            var ent = await _context.QuantityUnitGroups.FindAsync(dto.Id);
            if (ent == null) throw Errors.IdNotFound;
            if (_context.QuantityUnitGroups.Select(n => n.Name.ToLower()).Contains(dto.Name.ToLower())) throw Errors.DuplicateQuantityGroupName;
            ent.UpdatedAt = DateTime.Now;
            ent.Name=dto.Name;

            await _context.SaveChangesAsync(new CancellationToken());
            return ent;
        }
    }
}
