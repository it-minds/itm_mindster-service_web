using Application.Common.Mappings;
using Domain.Entities;

namespace Application.ActionApprovers
{
  public class ActionApproverDto : IAutoMap<ActionApprover>
  {
    public string Email { get; set; }
  }
}
