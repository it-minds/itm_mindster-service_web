using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
    }
  }
}
