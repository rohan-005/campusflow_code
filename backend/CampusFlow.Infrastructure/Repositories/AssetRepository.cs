using CampusFlow.Application.Interfaces.Repositories;
using CampusFlow.Domain.Entities;
using CampusFlow.Domain.Enums;
using CampusFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CampusFlow.Infrastructure.Repositories;

public class AssetRepository : IAssetRepository
{
    private readonly CampusFlowDbContext _context;

    public AssetRepository(CampusFlowDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Asset asset)
    {
        await _context.Assets.AddAsync(asset);
    }

    public async Task<Asset?> GetByIdAsync(int id)
    {
        return await _context.Assets.FindAsync(id);
    }

    public async Task<IEnumerable<Asset>> GetAllAsync()
    {
        return await _context.Assets.ToListAsync();
    }

    public async Task<IEnumerable<Asset>> GetApprovedAsync()
    {
        return await _context.Assets
            .Where(a => a.Status == ResourceStatus.Approved)
            .ToListAsync();
    }

    public async Task<IEnumerable<Asset>> GetPendingAsync()
    {
        return await _context.Assets
            .Where(a => a.Status == ResourceStatus.Pending)
            .ToListAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}