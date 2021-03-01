using System.Threading.Tasks;
using Application.Actions.Commands.CreateAction;
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
  }
}
