using System.Collections.Generic;
using Application.AppTokenActions;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.AppTokens
{
  public class AppTokenCreateDto : IAutoMap<AppToken>
  {
    public string Description { get; set; }

  }
}
