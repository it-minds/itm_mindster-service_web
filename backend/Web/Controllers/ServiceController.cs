using System.Collections.Generic;
using System.Threading.Tasks;
using Application.ExampleChildren.Queries.GetExampleChildren;
using Application.Services;
using Application.Services.Commands.CreateService;
using Application.Services.Queries;
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
      return await Mediator.Send(new GetServiceByIdQuery() { Id = id });
    }
    [HttpGet]
    public async Task<ActionResult<List<ServiceIdDto>>> GetAllServices()
    {
      return await Mediator.Send(new GetServicesQuery());
    }
  }
}
