using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Mappings;
using Action = Domain.Entities.Action;

namespace Application.Actions
{
  public class ActionDto : IAutoMap<Action>
  {
    public string Title { get; set; }
    public string ActionIdentifier { get; set; }
    public string Description { get; set; }
    public string AdminNote { get; set; }
  }
}
