namespace BikeShop.Products.Domain.Entities;

public class Brand : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string ImageSource { get; set; } = string.Empty;
    public int SortOrder { get; set; }
}