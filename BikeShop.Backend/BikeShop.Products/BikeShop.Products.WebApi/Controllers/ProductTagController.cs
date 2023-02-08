using AutoMapper;
using BikeShop.Products.Application.CQRS.Commands.Tag.CreateTag;
using BikeShop.Products.Application.CQRS.Commands.Tag.UpdateTag;
using BikeShop.Products.Application.CQRS.Queries.Product.GetProductsByTags;
using BikeShop.Products.Domain.Entities;
using BikeShop.Products.WebApi.Models.ProductTag;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Products.WebApi.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("tag")]
    public class ProductTagController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        public ProductTagController(IMapper mapper, IMediator mediator)
        {
            _mapper = mapper;
            _mediator = mediator;
        }

        [HttpPost("create")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<IActionResult> CreateTag([FromBody] CreateProductTagModel model)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }
            var command = _mapper.Map<CreateTagCommand>(model);
            await _mediator.Send(command);

            return Ok();

        }

        [HttpPost("update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateTag([FromBody] UpdateProductTagModel model)
        {
            if (!ModelState.IsValid)
            {
                {
                    return UnprocessableEntity(ModelState);
                }

            }
            var command = _mapper.Map<UpdateTagCommand>(model);
            await _mediator.Send(command);
            return Ok();
        }

            [HttpGet("getall")]
            [ProducesResponseType(StatusCodes.Status200OK)]
            [ProducesResponseType(StatusCodes.Status400BadRequest)]
            public async Task<IActionResult> GetTagAll(string tagAll)
            {
            var query = new GetProductsByTagsQuery { TagsArrayStr = tagAll };
            var productsModel = await _mediator.Send(query);

            return Ok(productsModel);
            }


        
    }
}
