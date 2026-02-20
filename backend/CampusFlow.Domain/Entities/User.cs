using CampusFlow.Domain.Enums;

namespace CampusFlow.Domain.Entities;

public class User
{
    public int Id { get; set; }

    public string Name { get; set; }

    public string StudentId { get; set; }

    public string Email { get; set; }

    public string PasswordHash { get; set; }

    public UserRole Role { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsActive { get; set; } = true;
}