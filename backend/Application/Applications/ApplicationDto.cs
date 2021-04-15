using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Applications
{
  public class ApplicationDto : IAutoMap<ApplicationEntity>
  {
    public string Title { get; set; }
    public string Description { get; set; }
    public string AppIdentifier { get; set; }
  }
}
