using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Payments.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("currency")]
    public class CurrencyController : ControllerBase
    {
        [HttpGet("getall")]
        public async Task GetProductCard(int productId)
        {
            
        }
    }
}
