namespace BikeShop.Products.Domain.Entities;

public class TagToProductBind : BaseEntity
{
    public int ProductId { get; set; }
    public Product Product { get; set; }

    public int ProductTagId { get; set; }
    public ProductTag ProductTag { get; set; }
}