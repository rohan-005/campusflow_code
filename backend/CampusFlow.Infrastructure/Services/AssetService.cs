using CampusFlow.Application.DTOs.Assets;
using CampusFlow.Application.Interfaces.Repositories;
using CampusFlow.Domain.Entities;
using CampusFlow.Domain.Enums;

namespace CampusFlow.Infrastructure.Services;

public class AssetService
{
    private readonly IAssetRepository _assetRepository;

    public AssetService(IAssetRepository assetRepository)
    {
        _assetRepository = assetRepository;
    }

    // 🔥 Admin creates directly approved asset
    public async Task CreateAsync(CreateAssetDto dto)
    {
        var asset = new Asset
        {
            Name = dto.Name,
            Category = dto.Category,
            Location = dto.Location,
            TotalQuantity = dto.TotalQuantity,
            AvailableQuantity = dto.TotalQuantity,
            Status = ResourceStatus.Approved
        };

        await _assetRepository.AddAsync(asset);
        await _assetRepository.SaveChangesAsync();
    }

    // 🔥 Student uploads asset (Pending)
    public async Task CreateByStudentAsync(int userId, CreateAssetDto dto)
    {
        var asset = new Asset
        {
            Name = dto.Name,
            Category = dto.Category,
            Location = dto.Location,
            TotalQuantity = dto.TotalQuantity,
            AvailableQuantity = dto.TotalQuantity,
            Status = ResourceStatus.Pending,
            CreatedBy = userId
        };

        await _assetRepository.AddAsync(asset);
        await _assetRepository.SaveChangesAsync();
    }

    public async Task<IEnumerable<Asset>> GetApprovedAsync()
    {
        return await _assetRepository.GetApprovedAsync();
    }

    public async Task<IEnumerable<Asset>> GetPendingAsync()
    {
        return await _assetRepository.GetPendingAsync();
    }

    public async Task ApproveAsync(int id)
    {
        var asset = await _assetRepository.GetByIdAsync(id);

        if (asset == null)
            throw new Exception("Asset not found");

        asset.Status = ResourceStatus.Approved;

        await _assetRepository.SaveChangesAsync();
    }

    public async Task RejectAsync(int id)
    {
        var asset = await _assetRepository.GetByIdAsync(id);

        if (asset == null)
            throw new Exception("Asset not found");

        asset.Status = ResourceStatus.Rejected;

        await _assetRepository.SaveChangesAsync();
    }
}