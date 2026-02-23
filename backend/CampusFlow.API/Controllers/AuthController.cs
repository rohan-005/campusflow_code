using CampusFlow.Application.DTOs.Auth;
using CampusFlow.Application.Interfaces.Services;
using CampusFlow.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CampusFlow.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly CampusFlowDbContext _context;

    // ✅ Single constructor (correct DI)
    public AuthController(
        IUserService userService,
        CampusFlowDbContext context)
    {
        _userService = userService;
        _context = context;
    }

    // -----------------------------------
    // REGISTER
    // -----------------------------------
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        try
        {
            await _userService.RegisterAsync(dto);
            return Ok(new { message = "User registered successfully" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    // -----------------------------------
    // LOGIN
    // -----------------------------------
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        try
        {
            var result = await _userService.LoginAsync(dto);
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }

    // -----------------------------------
    // GET ALL USERS (Admin Only)
    // -----------------------------------
    [Authorize(Roles = "Admin")]
    [HttpGet("all-users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _context.Users
            .Select(u => new
            {
                u.Id,
                u.Name,
                u.Email,
                u.StudentId,
                Role = u.Role.ToString(),
                u.CreatedAt,
                u.IsActive
            })
            .ToListAsync();

        return Ok(users);
    }

    // -----------------------------------
    // CURRENT USER INFO
    // -----------------------------------
    [Authorize]
    [HttpGet("me")]
    public IActionResult GetCurrentUser()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
        var role = User.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value;

        return Ok(new
        {
            UserId = userId,
            Email = email,
            Role = role
        });
    }
}