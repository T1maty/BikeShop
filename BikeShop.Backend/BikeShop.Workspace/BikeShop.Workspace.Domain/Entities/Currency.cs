namespace BikeShop.Workspace.Domain.Entities;

// Валюта
public class Currency : BaseEntity
{
    // Название валюты
    public string Name { get; set; } = string.Empty;

    // Коэффициент валюты для сравнения. У базовой валюты будет коэф 1
    public double Coefficient { get; set; }

    // Базовая ли валюта
    public bool IsBaseCurrency { get; set; }
    
    // Символ валюты ($ доллар например)
    public char Symbol { get; set; }
}