public interface IResourceService
{
    Task<ResourceResponseDto> UploadAsync(
        CreateResourceDto dto,
        //IFormFile file,
        Guid userId);

    Task<IEnumerable<ResourceResponseDto>> GetPendingAsync();

    Task ApproveAsync(Guid resourceId, Guid adminId);

    Task RejectAsync(Guid resourceId, Guid adminId);
}