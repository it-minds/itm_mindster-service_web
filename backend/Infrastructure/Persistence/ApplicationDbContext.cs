using Application.Common.Interfaces;
using Domain.Common;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
  public class ApplicationDbContext : DbContext, IApplicationDbContext
  {
    private readonly ICurrentUserService _currentUserService;
    private readonly IDateTimeOffsetService _dateTimeOffsetService;

    public ApplicationDbContext(
        DbContextOptions options,
        ICurrentUserService currentUserService,
        IDateTimeOffsetService dateTimeOffset) : base(options)
    {
      _currentUserService = currentUserService;
      _dateTimeOffsetService = dateTimeOffset;
    }

    public DbSet<ExampleChild> ExampleChildren { get; set; }
    public DbSet<ExampleParent> ExampleParents { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<Action> Actions { get; set; }
    public DbSet<ApplicationEntity> Applications { get; set; }




    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
      foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
      {
        switch (entry.State)
        {
          case EntityState.Added:
            entry.Entity.CreatedBy = _currentUserService.UserEmail;
            entry.Entity.Created = _dateTimeOffsetService.Now;
            break;
          case EntityState.Modified:
            entry.Entity.LastModifiedBy = _currentUserService.UserEmail;
            entry.Entity.LastModified = _dateTimeOffsetService.Now;
            break;
        }
      }

      return base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

      base.OnModelCreating(builder);
    }
  }
}
