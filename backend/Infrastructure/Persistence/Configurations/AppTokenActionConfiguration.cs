using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class AppTokenActionConfiguration : IEntityTypeConfiguration<AppTokenAction>
  {
    public void Configure(EntityTypeBuilder<AppTokenAction> builder)
    {

      builder.HasOne(e => e.AppToken)
        .WithMany(e => e.AppTokenActions)
        .HasForeignKey(e => e.AppTokenId)
        .IsRequired(true);

      builder.Property(e => e.ActionId)
        .IsRequired(true);
    }
  }
}
