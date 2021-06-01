using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Applications
{
  public class AppOverviewDto : IAutoMap<ApplicationEntity>
  {
    public string Title { get; set; }
    public string AppIdentifier { get; set; }
    public int Id { get; set; }
  }
}
