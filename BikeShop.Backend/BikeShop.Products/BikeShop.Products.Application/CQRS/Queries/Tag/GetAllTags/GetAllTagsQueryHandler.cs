using BikeShop.Products.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace BikeShop.Products.Application.CQRS.Queries.Tag.GetAllTags;

public class GetAllTagsQueryHandler : IRequestHandler<GetAllTagsQuery, TagsListModel>
{
    private readonly IApplicationDbContext _context;

    public GetAllTagsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<TagsListModel> Handle(GetAllTagsQuery request, CancellationToken cancellationToken)
    {
        var tags = await _context.ProductTags.ToListAsync(cancellationToken);

        return new TagsListModel { Tags = tags };
    }
}