using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class ServiceConfiguration : IEntityTypeConfiguration<Service>
  {
    public void Configure(EntityTypeBuilder<Service> builder)
    {
      builder.Property(e => e.Title)
        .HasMaxLength(200)
        .IsRequired();
      builder.HasMany<Action>(e => e.Actions)
        .WithOne(e => e.Service)
        .IsRequired(true);
      builder.Property(e => e.Description)
        .HasMaxLength(600);
      builder.Property(e => e.ServiceIdentifier)
        .HasMaxLength(200)
        .IsRequired(true);
    }

  }
}
