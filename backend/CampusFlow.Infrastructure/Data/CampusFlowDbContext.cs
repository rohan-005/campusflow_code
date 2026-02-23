using CampusFlow.Domain.Entities;
using CampusFlow.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace CampusFlow.Infrastructure.Data;

public class CampusFlowDbContext : DbContext
{
    public CampusFlowDbContext(DbContextOptions<CampusFlowDbContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Resource> Resources { get; set; }
    public DbSet<Asset> Assets { get; set; }
    public DbSet<AssetRequest> AssetRequests { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Resource>()
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(r => r.UploadedBy)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Resource>()
            .HasOne<User>()
            .WithMany()
            .HasForeignKey(r => r.ApprovedBy)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Resource>()
            .Property(r => r.Status)
            .HasConversion<string>();

        modelBuilder.Entity<AssetRequest>()
            .Property(r => r.ApprovalStatus)
            .HasConversion<string>();

        modelBuilder.Entity<Asset>()
            .Property(a => a.Status)
            .HasConversion<string>();
    }
}