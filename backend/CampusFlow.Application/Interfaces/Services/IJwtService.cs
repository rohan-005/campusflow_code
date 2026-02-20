using CampusFlow.Domain.Entities;

namespace CampusFlow.Application.Interfaces.Services;

public interface IJwtService
{
    string GenerateToken(User user);
}