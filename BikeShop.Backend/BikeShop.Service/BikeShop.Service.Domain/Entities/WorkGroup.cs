namespace BikeShop.Service.Domain.Entities;

// Категория услуг (трансмиссия, смазка, ...)
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
    // Из Shop microservice
    public int ShopId { get; set; }
}