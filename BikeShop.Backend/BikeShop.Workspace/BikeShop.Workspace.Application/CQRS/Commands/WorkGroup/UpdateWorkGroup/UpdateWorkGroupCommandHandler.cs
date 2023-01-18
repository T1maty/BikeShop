using BikeShop.Workspace.Application.Interfaces;
using MediatR;

namespace BikeShop.Workspace.Application.CQRS.Commands.WorkGroup.UpdateWorkGroup;

public class UpdateWorkGroupCommandHandler : IRequestHandler<UpdateWorkGroupCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateWorkGroupCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateWorkGroupCommand request, CancellationToken cancellationToken)
    {
        // todo

        return Unit.Value;
    }
}