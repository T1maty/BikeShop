using BikeShop.Identity.Domain.Entities;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;

public class GetUserModel
{
    public ApplicationUser User { get; set; }
    public IList<string> UserRoles { get; set; }
}