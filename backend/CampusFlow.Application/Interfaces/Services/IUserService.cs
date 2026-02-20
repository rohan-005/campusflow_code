using CampusFlow.Application.DTOs.Auth;

namespace CampusFlow.Application.Interfaces.Services;

public interface IUserService
{
    Task RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto> LoginAsync(LoginDto dto);
}