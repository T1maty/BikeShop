using System.Text.Json.Serialization;

namespace BikeShop.Workspace.Domain.Entities;

// Категория работ (трансмиссия, смазка, ...)
// От категории будут браться конкретные работы
public class WorkGroup : BaseEntity
{
    // Название группы работ
    public string Name { get; set; } = string.Empty;

    // id родительской группы. Если 0 - нету.
    public int ParentId { get; set; } = 0;

    // свернутая/развернутая
    public bool IsCollapsed { get; set; }

    // Магазин, в котором предоставляется эта группа работ
    public int ShopId { get; set; }
    [JsonIgnore] public Shop Shop { get; set; }
}