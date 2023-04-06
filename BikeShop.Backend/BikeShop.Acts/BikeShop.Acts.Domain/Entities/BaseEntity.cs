using System.ComponentModel.DataAnnotations;

namespace BikeShop.Payments.Domain.Entities;

public class BaseEntity
{
    [Key] public int Id { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    public bool Enabled { get; set; } = true;
}