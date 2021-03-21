using AutoMapper;
using Domain.Entities;
using Domain.Enums;

namespace Application.AppTokenActions
{
  public class AppTokenActionIdDto : AppTokenActionDto
  {
    public int Id { get; set; }
    public ServiceStates State { get; set; }
    public string RejectionReason { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<AppTokenAction, AppTokenActionIdDto>()
        .IncludeBase<AppTokenAction, AppTokenActionDto>();
    }
  }
}
