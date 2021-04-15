using System.Collections.Generic;
using Application.AppTokenActions;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;

namespace Application.AppTokens
{
  public class AppTokenIdDto : AppTokenCreateDto
  {
    public int Id { get; set; }
    public TokenStates State { get; set; }
    public ICollection<AppTokenActionIdDto> AppTokenActions { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<AppToken, AppTokenIdDto>()
        .IncludeBase<AppToken, AppTokenCreateDto>();
    }
  }
}
