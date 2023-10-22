using BikeShop.Identity.Application.CQRS.Queries.GetUserBySignInData;

namespace BikeShop.Identity.Application.CQRS.Queries.GetUsersByPhoneOrFio;

public class UserModelListModel
{
    public IList<GetUserModel> Users { get; set; }
}