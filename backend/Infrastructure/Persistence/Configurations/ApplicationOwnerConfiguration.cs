using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class ApplicationOwnerConfiguration : IEntityTypeConfiguration<ApplicationOwner>
  {
    public void Configure(EntityTypeBuilder<ApplicationOwner> builder)
    {
      builder.Property(e => e.Email)
        .HasMaxLength(200)
        .IsRequired();
      builder.Property(e => e.ApplicationId)
        .IsRequired();
    }
  }
}
