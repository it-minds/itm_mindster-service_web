using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class ServiceOwnerConfiguration : IEntityTypeConfiguration<ServiceOwner>
  {
    public void Configure(EntityTypeBuilder<ServiceOwner> builder)
    {
      builder.Property(e => e.Email)
        .HasMaxLength(200)
        .IsRequired();
      builder.Property(e => e.ServiceId)
        .IsRequired();
    }
  }
}
