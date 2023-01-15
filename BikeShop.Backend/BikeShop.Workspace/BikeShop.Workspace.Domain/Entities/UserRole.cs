using static System.String;

namespace BikeShop.Workspace.Domain.Entities;

public class UserRole : BaseEntity
{
    public string Name { get; set; } = Empty;
}