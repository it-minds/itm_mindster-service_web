using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class ActionApproverConfiguration : IEntityTypeConfiguration<ActionApprover>
  {
    public void Configure(EntityTypeBuilder<ActionApprover> builder)
    {
      builder.Property(e => e.Email)
        .HasMaxLength(200)
        .IsRequired();
      builder.Property(e => e.ActionId)
        .IsRequired();
    }
  }
}
