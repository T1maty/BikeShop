using BikeShop.Workspace.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Workspace.Application.CQRS.Queries.Work.GetWorksByGroupId;

// Получение всех услуг по айди группы услуг
public class GetWorkByGroupIdQueryHandler : IRequestHandler<GetWorksByGroupIdQuery, WorkListModel>
{
    private readonly IApplicationDbContext _context;

    public GetWorkByGroupIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<WorkListModel> Handle(GetWorksByGroupIdQuery request, CancellationToken cancellationToken)
    {
        // Получение всех услуг по айди группы услуг
        var result = await _context.Works
            .Where(work => work.WorkGroupId == request.GroupId)
            .ToListAsync(cancellationToken);

        // Засовываю результат в модель для респонса и возвращаю
        return new WorkListModel { Works = result };
    }
}