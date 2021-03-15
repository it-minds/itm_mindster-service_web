using AutoMapper;
using Domain.Entities;

namespace Application.AppTokens
{
  public class AppTokenIdDto : AppTokenDto
  {
    public int Id { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<AppToken, AppTokenIdDto>()
        .IncludeBase<AppToken, AppTokenDto>();
    }
  }
}
