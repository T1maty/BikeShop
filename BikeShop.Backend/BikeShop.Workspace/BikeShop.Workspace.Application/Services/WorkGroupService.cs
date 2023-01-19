using BikeShop.Workspace.Application.Extensions;
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Application.Services;

public class WorkGroupService
{
    private readonly IApplicationDbContext _context;
    
    public WorkGroupService(IApplicationDbContext context)
    {
        _context = context;
    }

    // Получить услугу по названию из конкретного магазина
    public async Task<WorkGroup?> GetShopWorkGroupByNameAsync(int shopId, string groupName,
        CancellationToken cancellationToken)
    {
        // Группу из запроса привожу в нормализованную форму
        groupName = groupName.ToSearchForm();

        // Ищу группу с таким именем в указанном магазине и возвращаю
        return await _context.WorkGroups.FirstOrDefaultAsync(
            group =>
                group.Name.ToLower().Trim() == groupName &&
                group.ShopId == shopId,
            cancellationToken);
    }
}