using CampusFlow.Domain.Enums;

namespace CampusFlow.Domain.Entities;

public class Resource
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Category { get; set; } = null!;

    public string FilePath { get; set; } = null!;

    public int UploadedBy { get; set; }

    public ResourceStatus Status { get; set; } = ResourceStatus.Pending;

    public int? ApprovedBy { get; set; }

    public DateTime? ApprovedAt { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}