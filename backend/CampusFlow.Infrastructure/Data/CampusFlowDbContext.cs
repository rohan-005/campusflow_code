using CampusFlow.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CampusFlow.Infrastructure.Data;

public class CampusFlowDbContext : DbContext
{
    public CampusFlowDbContext(DbContextOptions<CampusFlowDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
}