using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class ApplicationEntityConfiguration : IEntityTypeConfiguration<ApplicationEntity>
  {
    public void Configure(EntityTypeBuilder<ApplicationEntity> builder)
    {
      builder.Property(e => e.Title)
        .HasMaxLength(200)
        .IsRequired();
      builder.Property(e => e.AppIdentifier)
        .HasMaxLength(200)
        .IsRequired(true);
    }
  }
}
