namespace BikeShop.Identity.Application.Common.Configurations;

public class JwtConfiguration
{
    public string Key { get; set; }
    public string Issuer { get; set;}
    public string Audience { get; set; }
    public int MinutesToExpiration { get; set; }

    public TimeSpan Expire => TimeSpan.FromMinutes(MinutesToExpiration);
}