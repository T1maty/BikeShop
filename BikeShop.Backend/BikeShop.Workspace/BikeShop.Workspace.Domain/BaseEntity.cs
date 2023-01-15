using System.ComponentModel.DataAnnotations;

namespace BikeShop.Workspace.Domain;

// Базовая сущность, объект наследования
public class BaseEntity
{
    [Key]
    public int Id { get; set; }
    
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool Enabled { get; set; }
}