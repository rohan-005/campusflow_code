namespace CampusFlow.Domain.Entities;

public class AssetRequest
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int AssetId { get; set; }

    public DateTime RequestDate { get; set; } = DateTime.UtcNow;

    public string ApprovalStatus { get; set; } = "Pending";

    public DateTime? IssueDate { get; set; }

    public DateTime? DueDate { get; set; }

    public DateTime? ReturnDate { get; set; }
}