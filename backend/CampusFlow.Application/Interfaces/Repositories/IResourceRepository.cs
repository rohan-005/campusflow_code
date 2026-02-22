using CampusFlow.Domain.Entities;

namespace CampusFlow.Application.Interfaces.Repositories;

public interface IResourceRepository
{
    Task AddAsync(Resource resource);
    Task<Resource?> GetByIdAsync(int id);
    Task<IEnumerable<Resource>> GetPendingAsync();
    Task SaveChangesAsync();
}