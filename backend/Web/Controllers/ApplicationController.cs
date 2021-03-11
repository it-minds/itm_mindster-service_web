using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Applications.Commands.CreateApplication;
using Application.Services.Commands.CreateService;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
  public class ApplicationController : ApiControllerBase
  {
    [HttpPost]
    public async Task<ActionResult<int>> CreateApplication(CreateApplicationCommand command)
    {
      return await Mediator.Send(command);
    }
  }
}
