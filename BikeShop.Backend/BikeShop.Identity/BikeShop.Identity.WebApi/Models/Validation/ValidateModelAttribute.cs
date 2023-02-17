using Microsoft.AspNetCore.Mvc.Filters;

namespace BikeShop.Identity.WebApi.Models.Validation;

// Attribute for enabling custom validation model return
public class ValidateModelAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
            context.Result = new ValidationFailedResult(context.ModelState);
    }
}