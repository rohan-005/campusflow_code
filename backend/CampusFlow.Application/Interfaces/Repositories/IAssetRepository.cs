using CampusFlow.Domain.Entities;

namespace CampusFlow.Application.Interfaces.Repositories;

public interface IAssetRepository
{
    Task AddAsync(Asset asset);
    Task<Asset?> GetByIdAsync(int id);
    Task<IEnumerable<Asset>> GetAllAsync();
    Task<IEnumerable<Asset>> GetApprovedAsync();
    Task<IEnumerable<Asset>> GetPendingAsync();
    Task SaveChangesAsync();
}