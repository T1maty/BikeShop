namespace BikeShop.Service.Domain.Entities;

// Категория услуг (трансмиссия, смазка, ...)
// От категории будут браться конкретные работы
public class WorkGroup : BaseEntity
{
    public string Name { get; set; } = string.Empty; // Название группы работ
    public int ParentId { get; set; } // id родительской группы. Если 0 - нету.
    public bool IsCollapsed { get; set; } // свернутая/развернутая
    public int ShopId { get; set; } // Магазин, в котором предоставляется эта группа работ (из ShopMicroservice)
}