using System.Text.Json.Serialization;

namespace BikeShop.Products.Domain.Entities;

public class ProductTag : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public int ParentId { get; set; }
    public bool IsCollapsed { get; set; }
    public bool IsRetailVisible { get; set; }
    public bool IsB2BVisible { get; set; }
    public bool IsUniversal { get; set; }
    public int SortOrder { get; set; }
    
    [JsonIgnore] public IList<TagToProductBind> TagToProductBinds { get; set; }
}