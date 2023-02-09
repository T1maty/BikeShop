using BikeShop.Products.Application.Common.Exceptions;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Application.CQRS.Commands.Tag.CreateTag
{
    public class CreateTagCommandHandler : IRequestHandler<CreateTagCommand>
    {
        private readonly IApplicationDbContext _context;

        public CreateTagCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(CreateTagCommand request, CancellationToken cancellationToken)
        {
            var existingTag = await _context.ProductTags
                .FirstOrDefaultAsync(c => c.Name.ToLower() == request.Name.ToLower(),
                cancellationToken);

            if (existingTag is not null)
                throw new AlreadyExistsException($"Create tag error. Tag with name {request.Name} not found")
                {
                    Error = "tag_already_exists",
                    ErrorDescription = $"Create tag error. Tag with given name already exists"
                };

            var newTag = new ProductTag
            {
                IsB2BVisible = request.IsB2BVisible,
                IsCollapsed = request.IsCollapsed,
                IsRetailVisible = request.IsRetailVisible,
                IsUniversal = request.IsUniversal,
                ParentId = request.ParentId,
                Name = request.Name,
                SortOrder = request.SortOrder
            };

            _context.ProductTags.Add(newTag);
            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}