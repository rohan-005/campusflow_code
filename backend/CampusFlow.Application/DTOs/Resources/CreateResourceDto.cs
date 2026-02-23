namespace CampusFlow.Application.DTOs;

public class CreateResourceDto
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Category { get; set; } = null!;
}