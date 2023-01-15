using System.Text.Json.Serialization;
using static System.String;

namespace BikeShop.Workspace.Domain.Entities;

public class User : BaseEntity
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }

    public string? Phone { get; set; }

    public string Email { get; set; } = Empty;
    public string Password { get; set; } = Empty;

    public int RoleId { get; set; }
    [JsonIgnore] public UserRole Role { get; set; }
}