using AutoMapper;
using Domain.Entities;

namespace Application.ActionApprovers
{
  public class ActionApproverIdDto : ActionApproverDto
  {
    public int Id { get; set; }
    public void Mapping(Profile profile)
    {
      profile.CreateMap<ActionApprover, ActionApproverIdDto>()
        .IncludeBase<ActionApprover, ActionApproverDto>();
    }
  }
}
