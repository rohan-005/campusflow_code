using CampusFlow.Application.DTOs;

namespace CampusFlow.Application.Interfaces.Services;

public interface IResourceService
{
    Task<ResourceResponseDto> UploadAsync(
        CreateResourceDto dto,
        string filePath,
        int userId);

    Task<IEnumerable<ResourceResponseDto>> GetPendingAsync();
    Task<IEnumerable<ResourceResponseDto>> GetApprovedAsync();

    Task ApproveAsync(int resourceId, int adminId);
    Task RejectAsync(int resourceId, int adminId);
}