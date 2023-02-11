namespace BikeShop.Identity.WebApi.Models.User;

// Входящая модель обновления публичных данных пользователя на endpoint /user/updatepublic
// Идёт вместе с JWT-access токеном в заголовке для идентификации пользователя
public class UpdateUserPublicModel
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    public string? Email { get; set; }
}