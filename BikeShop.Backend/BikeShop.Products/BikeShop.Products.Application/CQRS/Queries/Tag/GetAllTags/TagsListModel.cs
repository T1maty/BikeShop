using BikeShop.Products.Domain.Entities;

namespace BikeShop.Products.Application.CQRS.Queries.Tag.GetAllTags;

public class TagsListModel
{
    public IList<ProductTag> Tags { get; set; }
}