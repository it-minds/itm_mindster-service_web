using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class ActionConfiguration : IEntityTypeConfiguration<Action>
  {
    public void Configure(EntityTypeBuilder<Action> builder)
    {
      builder.Property(e => e.Title)
        .HasMaxLength(200)
        .IsRequired();
      builder.Property(e => e.ActionIdentifier)
        .HasMaxLength(200)
        .IsRequired();
      builder.Property(e =>e.ServiceId)
        .IsRequired();
      builder.Property(e => e.AdminNote)
        .HasMaxLength(400);
      builder.HasOne<Service>(e => e.Service)
        .WithMany(e => e.Actions)
        .HasForeignKey(e => e.ServiceId)
        .IsRequired(true);
    }
  }
}
