using BikeShop.Products.Application.Common.Exceptions;
using BikeShop.Products.Application.Interfaces;
using BikeShop.Products.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Application.CQRS.Commands.Tag.CreateTag
{
    public class CreateTagCommandHandler : IRequestHandler<CreateTagCommand, ProductTag>
    {
        private readonly IApplicationDbContext _context;

        public CreateTagCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProductTag> Handle(CreateTagCommand request, CancellationToken cancellationToken)
        {
            // Ищу существующий тег с таким названием
            var existingTag = await _context.ProductTags
                .FirstOrDefaultAsync(
                    c => c.Name.ToLower() == request.Name.ToLower(),
                    cancellationToken);

            // Если есть - ошибка
            if (existingTag is not null)
                throw new AlreadyExistsException($"Create tag error. Tag with name {request.Name} already exists")
                {
                    Error = "tag_already_exists",
                    ErrorDescription = "Create tag error. Tag with given name already exists",
                    ReasonField = "name"
                };

            // Ищу родительский тег с указанным parent id, если такого нет - ошибка
            if (request.ParentId != 0)
            {
                var parentTag = await _context.ProductTags.FindAsync(request.ParentId, cancellationToken);
                if (parentTag is null)
                    throw new NotFoundException($"Create tag error. Parent tag with id {request.ParentId} not found")
                    {
                        Error = "tag_not_found",
                        ErrorDescription = "Create tag error. Parent tag with given parent id not found",
                        ReasonField = "parentId"
                    };
            }
            
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

            return newTag;
        }
    }
}