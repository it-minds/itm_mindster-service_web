using System.Collections.Generic;
using Application.AppTokenActions;
using AutoMapper;
using Domain.Entities;

namespace Application.AppTokens
{
  public class AppTokenIdDto : AppTokenCreateDto
  {
    public int Id { get; set; }

    public ICollection<AppTokenActionIdDto> AppTokenActions { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<AppToken, AppTokenIdDto>()
        .IncludeBase<AppToken, AppTokenCreateDto>();
    }
  }
}
