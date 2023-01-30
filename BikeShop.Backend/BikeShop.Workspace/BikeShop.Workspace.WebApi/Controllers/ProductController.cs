using AutoMapper;
using BikeShop.Workspace.Application.Common.Mappings;
using BikeShop.Workspace.Application.CQRS.Commands.Product.CreateProduct;
using BikeShop.Workspace.Domain.Entities;
using BikeShop.Workspace.WebApi.Models.Product;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using static BikeShop.Workspace.Domain.Entities.Product;

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
        
        
    }
}