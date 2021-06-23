using System.Collections.Generic;

namespace Application.AppTokenActions
{
  public class RequestServiceActionsDto
  {
    public int ServiceId { get; set; }
    public ICollection<int> ActionIds { get; set; }
  }
}
