using AutoMapper;
using Domain.Entities;

namespace Application.AppTokenActions
{
  public class AppTokenActionIdDto : AppTokenActionDto
  {
    public int Id { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<AppTokenAction, AppTokenActionIdDto>()
        .IncludeBase<AppTokenAction, AppTokenActionDto>();
    }
  }
}
