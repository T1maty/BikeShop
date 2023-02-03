namespace BikeShop.Products.Application.CQRS.Queries.Product.GetProductsByTags;

public class ProductsListModel
{
    public List<Domain.Entities.Product> Products { get; set; }
}
