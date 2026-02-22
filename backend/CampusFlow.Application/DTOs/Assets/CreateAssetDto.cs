namespace CampusFlow.Application.DTOs.Assets;

public class CreateAssetDto
{
    public string Name { get; set; } = null!;
    public string Category { get; set; } = null!;
    public string Location { get; set; } = null!;
    public int TotalQuantity { get; set; }
}