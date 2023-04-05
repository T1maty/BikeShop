using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("acts")]
    public class ActController
    {
        [HttpGet("getall")]
        public async Task GetAll()
        {

        }
    }
}
