using CampusFlow.Domain.Entities;

namespace CampusFlow.Application.Interfaces.Repositories;

public interface IAssetRequestRepository
{
    Task AddAsync(AssetRequest request);
    Task<AssetRequest?> GetByIdAsync(int id);
    Task<IEnumerable<AssetRequest>> GetPendingAsync();
    Task<IEnumerable<AssetRequest>> GetByUserIdAsync(int userId);
    Task<IEnumerable<AssetRequest>> GetAllAsync();
    Task SaveChangesAsync();
}