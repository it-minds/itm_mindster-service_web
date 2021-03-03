using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Action = Domain.Entities.Action;

namespace Application.Actions
{
  public class ActionIdDto : ActionDto
  {
    public int Id { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<Action, ActionIdDto>()
        .IncludeBase<Action, ActionDto>();
    }
  }
}
