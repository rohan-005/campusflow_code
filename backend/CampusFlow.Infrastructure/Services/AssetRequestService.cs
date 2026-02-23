using CampusFlow.Application.DTOs.Assets;
using CampusFlow.Application.Interfaces.Repositories;
using CampusFlow.Domain.Entities;
using CampusFlow.Domain.Enums;

namespace CampusFlow.Infrastructure.Services;

public class AssetRequestService
{
    private readonly IAssetRequestRepository _requestRepo;
    private readonly IAssetRepository _assetRepo;

    public AssetRequestService(
        IAssetRequestRepository requestRepo,
        IAssetRepository assetRepo)
    {
        _requestRepo = requestRepo;
        _assetRepo = assetRepo;
    }

    public async Task CreateRequestAsync(int userId, CreateAssetRequestDto dto)
    {
        var asset = await _assetRepo.GetByIdAsync(dto.AssetId);

        if (asset == null)
            throw new Exception("Asset not found");

        var request = new AssetRequest
        {
            UserId = userId,
            AssetId = dto.AssetId,
            DueDate = dto.DueDate,
            ApprovalStatus = ResourceStatus.Pending
        };

        await _requestRepo.AddAsync(request);
        await _requestRepo.SaveChangesAsync();
    }

    public async Task<IEnumerable<AssetRequest>> GetPendingAsync()
    {
        return await _requestRepo.GetPendingAsync();
    }

    public async Task ApproveAsync(int requestId)
    {
        var request = await _requestRepo.GetByIdAsync(requestId);
        if (request == null)
            throw new Exception("Request not found");

        var asset = await _assetRepo.GetByIdAsync(request.AssetId);
        if (asset == null || asset.AvailableQuantity <= 0)
            throw new Exception("Asset unavailable");

        request.ApprovalStatus = ResourceStatus.Approved;
        request.IssueDate = DateTime.UtcNow;

        asset.AvailableQuantity--;

        await _requestRepo.SaveChangesAsync();
        await _assetRepo.SaveChangesAsync();
    }
}