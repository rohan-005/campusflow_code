using BCrypt.Net;
using CampusFlow.Application.DTOs.Auth;
using CampusFlow.Application.Interfaces.Services;
using CampusFlow.Domain.Entities;
using CampusFlow.Domain.Enums;
using CampusFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CampusFlow.Infrastructure.Services;

public class UserService : IUserService
{
    private readonly CampusFlowDbContext _context;
    private readonly IJwtService _jwtService;

    public UserService(CampusFlowDbContext context, IJwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    public async Task RegisterAsync(RegisterDto dto)
    {
        if (dto == null)
            throw new ArgumentNullException(nameof(dto));

        var email = dto.Email?.Trim().ToLower();
        var password = dto.Password?.Trim();

        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            throw new InvalidOperationException("Email and password are required");

        var emailExists = await _context.Users
            .AnyAsync(x => x.Email.ToLower() == email);

        if (emailExists)
            throw new InvalidOperationException("Email already exists");

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

        var user = new User
        {
            Name = dto.Name?.Trim(),
            StudentId = dto.StudentId?.Trim(),
            Email = email,
            PasswordHash = hashedPassword,
            Role = UserRole.Student,
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
    }

    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var email = dto.Email?.Trim().ToLower();
        var password = dto.Password?.Trim();

        Console.WriteLine("Login email: " + email);

        var allUsers = await _context.Users.ToListAsync();
        Console.WriteLine("Users count in DB: " + allUsers.Count);

        foreach (var u in allUsers)
        {
            Console.WriteLine("DB Email: " + u.Email);
        }

        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email.ToLower() == email);

        if (user == null)
            throw new UnauthorizedAccessException("Invalid credentials");

        Console.WriteLine("Found user: " + user.Email);

        var passwordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);

        Console.WriteLine("Password verify result: " + passwordValid);

        if (!passwordValid)
            throw new UnauthorizedAccessException("Invalid credentials");

        var token = _jwtService.GenerateToken(user);

        return new AuthResponseDto
        {
            Token = token,
            Email = user.Email,
            Role = user.Role.ToString()
        };
    }
}