using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Acts.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("inventarization")]
    public class InventarizationController
    {
        [HttpGet("getbyshop")]
        public async Task GetByShop()
        {

        }

        [HttpPost("create")]
        public async Task Create()
        {

        }

        [HttpPut("update")]
        public async Task Update()
        {

        }

        [HttpPut("closeact")]
        public async Task CloseAct()
        {

        }

        [HttpGet("getlackbyshop")]
        public async Task GetLackByShop()
        {

        }

        [HttpPost("createlack")]
        public async Task CreateLack()
        {

        }
    }
}
