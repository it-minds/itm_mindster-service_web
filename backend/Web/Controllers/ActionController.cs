using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Actions;
using Application.Actions.Commands.CreateAction;
using Application.Actions.Queries.GetActions;
using Application.ExampleChildren.Queries.GetExampleChildren;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class ActionController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> CreateAction([FromBody] CreateActionCommand command)
    {
      return await Mediator.Send(command);
    }

    [HttpGet]
    public async Task<ActionResult<List<ActionIdDto>>> GetAllActions()
    {
      return await Mediator.Send(new GetActionsQuery());
    }
  }
}
