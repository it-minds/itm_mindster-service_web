using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class AppTokenConfiguration : IEntityTypeConfiguration<AppToken>
  {
    public void Configure(EntityTypeBuilder<AppToken> builder)
    {
      builder.Property(e => e.ApplicationId)
        .IsRequired(true);
      builder.HasMany<AppTokenAction>(e => e.AppTokenActions)
        .WithOne(e => e.AppToken)
        .IsRequired(true);
    }
  }
}
