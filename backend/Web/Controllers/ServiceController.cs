using System.Threading.Tasks;
using Application.Actions.Commands.CreateAction;
using Application.Services.Commands.CreateService;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class ServiceController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> CreateService(CreateServiceCommand command)
    {
      return await Mediator.Send(command);
    }
    [HttpPost("{id}/Actions")]
    public async Task<ActionResult<int>> CreateAction([FromRoute] int id, CreateActionCommand command)
    {
      command.Id = id;
      return await Mediator.Send(command);
    }
  }
}
