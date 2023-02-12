namespace BikeShop.Products.Application.CQRS.Queries.Product.GetProductsByTagsQuery;

public class ProductsListModel
{
    public List<Domain.Entities.Product> Products { get; set; }
}
