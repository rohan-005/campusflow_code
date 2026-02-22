using CampusFlow.Application.DTOs.Assets;
using CampusFlow.Application.Interfaces.Repositories;
using CampusFlow.Domain.Entities;

namespace CampusFlow.Infrastructure.Services;

public class AssetService
{
    private readonly IAssetRepository _assetRepository;

    public AssetService(IAssetRepository assetRepository)
    {
        _assetRepository = assetRepository;
    }

    public async Task CreateAsync(CreateAssetDto dto)
    {
        var asset = new Asset
        {
            Name = dto.Name,
            Category = dto.Category,
            Location = dto.Location,
            TotalQuantity = dto.TotalQuantity,
            AvailableQuantity = dto.TotalQuantity
        };

        await _assetRepository.AddAsync(asset);
        await _assetRepository.SaveChangesAsync();
    }

    public async Task<IEnumerable<Asset>> GetAllAsync()
    {
        return await _assetRepository.GetAllAsync();
    }
}