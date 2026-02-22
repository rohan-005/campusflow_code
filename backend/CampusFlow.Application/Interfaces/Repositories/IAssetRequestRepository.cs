using CampusFlow.Domain.Entities;

namespace CampusFlow.Application.Interfaces.Repositories;

public interface IAssetRequestRepository
{
    Task AddAsync(AssetRequest request);
    Task<AssetRequest?> GetByIdAsync(int id);
    Task<IEnumerable<AssetRequest>> GetPendingAsync();
    Task SaveChangesAsync();
}