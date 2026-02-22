using CampusFlow.Application.Interfaces.Repositories;
using CampusFlow.Domain.Entities;
using CampusFlow.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CampusFlow.Infrastructure.Repositories;

public class AssetRequestRepository : IAssetRequestRepository
{
    private readonly CampusFlowDbContext _context;

    public AssetRequestRepository(CampusFlowDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(AssetRequest request)
    {
        await _context.AssetRequests.AddAsync(request);
    }

    public async Task<AssetRequest?> GetByIdAsync(int id)
    {
        return await _context.AssetRequests.FindAsync(id);
    }

    public async Task<IEnumerable<AssetRequest>> GetPendingAsync()
    {
        return await _context.AssetRequests
            .Where(r => r.ApprovalStatus == "Pending")
            .ToListAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}