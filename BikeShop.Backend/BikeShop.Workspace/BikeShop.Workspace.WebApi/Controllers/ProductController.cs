using AutoMapper;
using BikeShop.Workspace.Application.CQRS.Commands.Product.CreateProduct;
using BikeShop.Workspace.Application.CQRS.Commands.Product.UpdateProduct;
using BikeShop.Workspace.Application.CQRS.Queries.Product;
using BikeShop.Workspace.WebApi.Models.Product;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Workspace.WebApi.Controllers
{
    [ApiController]
    [Route("product")]
    public class ProductController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public ProductController(IMapper mapper, IMediator mediator)
        {
            _mapper = mapper;
            _mediator = mediator;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateProduct([FromBody] CreateProductModel model)
        {
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            var command = _mapper.Map<CreateProductCommand>(model);
            await _mediator.Send(command);

            return Ok();
        }


        [HttpGet("getbybarcode/{barcode}")]
        public async Task<IActionResult> GetProductByBarcode(string barcode)
        {
            var query = new GetProductByBarcodeQuery { Barcode = barcode };
            var product = await _mediator.Send(query);

            return Ok(product);
        }


        [HttpPut("update")]
        public async Task<IActionResult> UpdateProduct([FromBody] UpdateProductModel model)
        {
            if (!ModelState.IsValid)
                return UnprocessableEntity(ModelState);

            var command = _mapper.Map<UpdateProductCommand>(model);
            await _mediator.Send(command);

            return Ok();
        }
    }
}