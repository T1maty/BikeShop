using AutoMapper;
using BikeShop.Workspace.Application.Interfaces;
using BikeShop.Workspace.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BikeShop.Workspace.WebApi.Controllers;

[ApiController]
[Route("/")]
public class TempController : ControllerBase
{
    private readonly IRepository<User> _userRepository;

    public TempController(IRepository<User> userRepository)
    {
        _userRepository = userRepository;

    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        return Ok(await _userRepository.Get(id));
    }

    [HttpPost]
    public async Task<IActionResult> AddUser(User user)
    {
        _userRepository.Add(user);
        int count = await _userRepository.Save(CancellationToken.None);

        return Ok(count);
    }
    
}