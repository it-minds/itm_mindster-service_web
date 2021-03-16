using System.Collections.Generic;
using Application.AppTokenActions;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.AppTokens
{
  public class AppTokenUpdateDto : IAutoMap<AppToken>
  {
    public ICollection<AppTokenActionUpdateDto> AppTokenActions { get; set; }
  }
}
