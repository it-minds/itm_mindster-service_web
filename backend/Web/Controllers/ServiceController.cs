using System.Collections.Generic;
using System.Threading.Tasks;
using Application.ActionApprovers;
using Application.ActionApprovers.Commands.CreateActionApprovers;
using Application.ActionApprovers.Queries.GetActionApproversByActionId;
using Application.ActionApprovers.Queries.GetActionApproversByServiceId;
using Application.Services;
using Application.Services.Commands.CreateService;
using Application.Services.Queries;
using Application.Actions.Commands.CreateAction;
using Application.ServiceOwners;
using Application.ServiceOwners.Commands.CreateServiceOwners;
using Application.ServiceOwners.Queries.GetServiceOwnersByServiceId;
using Application.Services.Queries.GetServices;
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

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceIdDto>> GetServiceById([FromRoute] int id)
    {
      return await Mediator.Send(new GetServiceByIdQuery {Id = id});
    }
    [HttpPost("{id}/ServiceOwners")]
    public async Task<ActionResult<int>> AddServiceOwners([FromRoute] int id, CreateServiceOwnerCommand command)
    {
      command.Id = id;
      return await Mediator.Send(command);
    }
    [HttpGet("{id}/ServiceOwners")]
    public async Task<ActionResult<List<ServiceOwnerIdDto>>> GetServiceOwnersByServiceId([FromRoute] int id)
    {
      return await Mediator.Send(new GetServiceOwnersByServiceIdQuery { Id = id });
    }
    [HttpPost("{id}/Actions")]
    public async Task<ActionResult<int>> CreateAction([FromRoute] int id, CreateActionCommand command)
    {
      command.Id = id;
      return await Mediator.Send(command);
    }
    [HttpPost("{id}/ActionApprovers")]
    public async Task<ActionResult<int>> AddActionApprovers([FromRoute] int id, CreateActionApproverCommand command)
    {
      command.Id = id;
      return await Mediator.Send(command);
    }
    [HttpGet("Actions/{id}/ActionApprovers")]
    public async Task<ActionResult<List<ActionApproverIdDto>>> GetActionApproversByActionId([FromRoute] int id)
    {
      return await Mediator.Send(new GetActionApproversByActionIdQuery { Id = id });
    }
    [HttpGet("{id}/ActionApprovers")]
    public async Task<ActionResult<List<ActionApproverIdDto>>> GetActionApproversByServiceId([FromRoute] int id)
    {
      return await Mediator.Send(new GetActionApproversByServiceIdQuery { Id = id });
    }
    [HttpGet("All")]
    public async Task<ActionResult<List<ServiceIdDto>>> GetAllServices()
    {
      return await Mediator.Send(new GetServicesQuery());
    }
    [HttpGet("MyServices")]
    public async Task<ActionResult<List<ServiceIdDto>>> GetMyServices()
    {
      return await Mediator.Send(new GetMyServicesQuery());
    }
  }
}
