using CampusFlow.Domain.Enums;

namespace CampusFlow.Domain.Entities;

public class Asset
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Category { get; set; } = null!;

    public string Location { get; set; } = null!;

    public int TotalQuantity { get; set; }

    public int AvailableQuantity { get; set; }

    public ResourceStatus Status { get; set; } = ResourceStatus.Pending;

    public int CreatedBy { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}