using System.Collections.Generic;
using Application.AppTokenActions;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.AppTokens
{
  public class AppTokenDto : IAutoMap<AppToken>
  {
    public ICollection<AppTokenActionDto> AppTokenActions { get; set; }

  }
}
