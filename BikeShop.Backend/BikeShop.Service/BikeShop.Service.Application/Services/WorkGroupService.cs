using BikeShop.Products.Application.Common.Errors;
using BikeShop.Service.Application.Interfaces;
using BikeShop.Service.Domain.Entities;
using BikeShop.Service.WebApi.Models.WorkGroup;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Service.Application.Services
{
    public class WorkGroupService : IWorkGroupService
    {
        private readonly IApplicationDbContext _context;

        public WorkGroupService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<WorkGroup> CreateWorkGroup(CreateWorkGroupModel model)
        {
            // Существует ли группа услуг с id, указанным в parentId
            // Если нет - исключение
            if (model.ParentId != 0)
            {
                var parentGroup = await _context.WorkGroups.FindAsync(model.ParentId);
                if (parentGroup is null) throw Errors.ParentGroupNotFound;
            }

            // Существует ли уже услуга с таким названием
            var existingGroup = await GetShopWorkGroupByNameAsync(model.ShopId, model.Name);

            // Если да - исключение
            if (existingGroup is not null)throw Errors.GroupAlreadyExist;

            // Если все ок - создаю группу и сохраняю в базу
            var newGroup = new WorkGroup
            {
                Name = model.Name,
                IsCollapsed = model.IsCollapsed,
                ParentId = model.ParentId,
                ShopId = model.ShopId
            };

            _context.WorkGroups.Add(newGroup);

            await _context.SaveChangesAsync(new CancellationToken());

            return newGroup;
        }

        // Получить услугу по названию из конкретного магазина
        private async Task<WorkGroup?> GetShopWorkGroupByNameAsync(int shopId, string groupName)
        {
            // Ищу группу с таким именем в указанном магазине и возвращаю
            return await _context.WorkGroups.FirstOrDefaultAsync(
                group =>
                    group.Name.ToLower().Trim() == groupName.ToLower().Trim() &&
                    group.ShopId == shopId);
        }

        public async Task<List<WorkGroup>> GetWorkGroupsByShopId(int id)
        {
            var workGroups = await _context.WorkGroups.Where(group => group.ShopId == id).ToListAsync();
            return workGroups;
        }

        public async Task<WorkGroup> UpdateWorkGroup(UpdateWorkGroupModel model)
        {
            // Существует ли группа услуг с id, указанным в parentId
            // Если нет - исключение
            if (model.ParentId != 0)
            {
                var parentGroup = await _context.WorkGroups.FindAsync(model.ParentId);
                if (parentGroup is null) throw Errors.ParentGroupNotFound;
            }

            // Существует ли уже услуга с таким названием
            var existingGroup = await GetShopWorkGroupByNameAsync(model.ShopId, model.Name);

            // Если да - исключение
            if (existingGroup is not null && existingGroup.Name != model.Name) throw Errors.GroupAlreadyExist;


            // Получаю сущность для обновления
            var workGroup = await _context.WorkGroups.FindAsync(model.Id);

            // Если сущности с таким айди нету - исключение
            if (workGroup is null) throw Errors.WorkGroupNotFoundUpdate;

            // Если все ок - обновляю данные сущности и сохраняю
            workGroup.Name = model.Name;
            workGroup.IsCollapsed = model.IsCollapsed;
            workGroup.ShopId = model.ShopId;
            workGroup.ParentId = model.ParentId;
            workGroup.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync(new CancellationToken());

            return workGroup;
        }
    }
}
