using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Enums;

namespace Domain.Entities
{
  public class Service
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string ServiceIdentifier { get; set; }
    public string Description { get; set; }
    public virtual ICollection<Action> Actions { get; set; }
    public ServiceStates State { get; set; }
  }
}
