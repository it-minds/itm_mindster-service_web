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
        .HasForeignKey(e => e.AppTokenId)
        .IsRequired(true);
      builder.Property(e => e.Description)
        .IsRequired(true)
        .HasMaxLength(300);
      builder.Property(e => e.State)
        .IsRequired(true);
      builder.Property(e => e.TokenIdentifier)
        .IsRequired(true)
        .HasMaxLength(200);
    }
  }
}
