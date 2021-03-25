using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
  public interface IApplicationDbContext
  {


    DbSet<ExampleChild> ExampleChildren { get; set; }
    DbSet<ExampleParent> ExampleParents { get; set; }
    DbSet<ActionApprover> ActionApprovers { get; set; }
    DbSet<ApplicationOwner> AppOwners { get; set; }
    DbSet<ServiceOwner> ServiceOwners { get; set; }
    DbSet<Service> Services { get; set; }
    DbSet<Action> Actions { get; set; }
    DbSet<ApplicationEntity> Applications { get; set; }
    DbSet<AppToken> AppTokens { get; set; }
    DbSet<AppTokenAction> AppTokenActions { get; set; }


    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
  }
}
