using CampusFlow.Application.DTOs;
using CampusFlow.Application.Interfaces.Repositories;
using CampusFlow.Application.Interfaces.Services;
using CampusFlow.Domain.Entities;
using CampusFlow.Domain.Enums;

namespace CampusFlow.Infrastructure.Services;

public class ResourceService : IResourceService
{
    private readonly IResourceRepository _repo;

    public ResourceService(IResourceRepository repo)
    {
        _repo = repo;
    }

    public async Task<ResourceResponseDto> UploadAsync(
        CreateResourceDto dto,
        string filePath,
        int userId)
    {
        var resource = new Resource
        {
            Title = dto.Title,
            Description = dto.Description,
            Category = dto.Category,
            FilePath = filePath,
            UploadedBy = userId,
            Status = ResourceStatus.Pending
        };

        await _repo.AddAsync(resource);
        await _repo.SaveChangesAsync();

        return new ResourceResponseDto
        {
            Id = resource.Id,
            Title = resource.Title,
            Description = resource.Description,
            Category = resource.Category,
            FilePath = resource.FilePath,
            Status = resource.Status.ToString(),
            CreatedAt = resource.CreatedAt
        };
    }

    public async Task<IEnumerable<ResourceResponseDto>> GetPendingAsync()
    {
        var list = await _repo.GetPendingAsync();

        return list.Select(r => new ResourceResponseDto
        {
            Id = r.Id,
            Title = r.Title,
            Description = r.Description,
            Category = r.Category,
            FilePath = r.FilePath,
            Status = r.Status.ToString(),
            CreatedAt = r.CreatedAt
        });
    }

    public async Task<IEnumerable<ResourceResponseDto>> GetApprovedAsync()
    {
        var list = await _repo.GetApprovedAsync();

        return list.Select(r => new ResourceResponseDto
        {
            Id = r.Id,
            Title = r.Title,
            Description = r.Description,
            Category = r.Category,
            FilePath = r.FilePath,
            Status = r.Status.ToString(),
            CreatedAt = r.CreatedAt
        });
    }

    public async Task ApproveAsync(int resourceId, int adminId)
    {
        var resource = await _repo.GetByIdAsync(resourceId);
        if (resource == null) throw new Exception("Resource not found");

        resource.Status = ResourceStatus.Approved;
        resource.ApprovedBy = adminId;
        resource.ApprovedAt = DateTime.UtcNow;

        await _repo.SaveChangesAsync();
    }

    public async Task RejectAsync(int resourceId, int adminId)
    {
        var resource = await _repo.GetByIdAsync(resourceId);
        if (resource == null) throw new Exception("Resource not found");

        resource.Status = ResourceStatus.Rejected;
        resource.ApprovedBy = adminId;
        resource.ApprovedAt = DateTime.UtcNow;

        await _repo.SaveChangesAsync();
    }
}