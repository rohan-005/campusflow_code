using CampusFlow.Application.Interfaces.Repositories;
using CampusFlow.Domain.Entities;
using CampusFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CampusFlow.Infrastructure.Repositories;

public class ResourceRepository : IResourceRepository
{
    private readonly CampusFlowDbContext _context;

    public ResourceRepository(CampusFlowDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Resource resource)
    {
        await _context.Resources.AddAsync(resource);
    }

    public async Task<Resource?> GetByIdAsync(int id)
    {
        return await _context.Resources.FindAsync(id);
    }

    public async Task<IEnumerable<Resource>> GetPendingAsync()
    {
        return await _context.Resources
            .Where(r => r.Status == Domain.Enums.ResourceStatus.Pending)
            .ToListAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}