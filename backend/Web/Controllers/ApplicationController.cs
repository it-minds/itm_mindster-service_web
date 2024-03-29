using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.ApplicationOwners;
using Application.ApplicationOwners.Commands.CreateApplicationOwners;
using Application.ApplicationOwners.Queries.GetAppOwnersByAppId;
using Application.Applications;
using Application.Applications.Commands.CreateApplication;
using Application.Applications.Commands.CreateAppSecret;
using Application.Applications.Commands.UpdateApplication;
using Application.Applications.Queries.GetApplications;
using Application.AppTokenActions.Commands;
using Application.AppTokenActions.Commands.CreateAppTokenAction;
using Application.AppTokenActions.Commands.UpdateAppTokenActions;
using Application.AppTokens;
using Application.AppTokens.Commands;
using Application.AppTokens.Commands.CreateAppToken;
using Application.AppTokens.Commands.CreateAuthAppToken;
using Application.AppTokens.Commands.UpdateAppTokenActions;
using Application.AppTokens.Queries.GetAppToken;
using Application.AppTokens.Queries.GetAppTokens;
using Application.Services.Commands.CreateService;
using AuthService.Client;
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
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateApplication([FromRoute] int id, UpdateApplicationCommand command)
    {
      command.Id = id;
      await Mediator.Send(command);

      return NoContent();
    }
    [HttpGet]
    public async Task<ActionResult<List<ApplicationIdDto>>> GetAllApplications()
    {
      return await Mediator.Send(new GetMyApplicationsQuery());
    }
    [HttpGet("Overview")]
    public async Task<ActionResult<List<AppOverviewDto>>> GetAllMyApplicationsOverview()
    {
      return await Mediator.Send(new GetMyAppOverviewQuery());
    }
    [HttpPost("{id}/ApplicationOwners")]
    public async Task<ActionResult<int>> AddAppOwners([FromRoute] int id, CreateApplicationOwnerCommand command)
    {
      command.Id = id;
      return await Mediator.Send(command);
    }
    [HttpGet("{id}/ApplicationOwners")]
    public async Task<ActionResult<List<ApplicationOwnerIdDto>>> GetApplicationOwnersByAppId([FromRoute] int id)
    {
      return await Mediator.Send(new GetAppOwnersByAppIdQuery { Id = id });
    }
    [HttpPost("{id}/AppTokens")]
    public async Task<ActionResult<int>> CreateAppToken([FromRoute] int id, CreateAppTokenCommand command)
    {
      command.Id = id;
      return await Mediator.Send(command);
    }
    [HttpPost("AppTokens/{tokenId}/AppTokenActions")]
    public async Task<ActionResult<int>> RequestServiceActions([FromRoute] int tokenId, CreateAppTokenActionsCommand command)
    {
      command.TokenId = tokenId;
      return await Mediator.Send(command);
    }
    [HttpGet("AppTokens")]
    public async Task<ActionResult<List<AppTokenIdDto>>> GetAllAppTokens([FromQuery]bool onlyPending = false)
    {

      return await Mediator.Send(new GetAppTokensQuery {OnlyPending = onlyPending});
    }
    [HttpGet("/AppTokens/{id}")]
    public async Task<ActionResult<AppTokenIdDto>> GetAppTokenById([FromRoute] int id)
    {
      return await Mediator.Send(new GetAppTokenByIdQuery { Id = id });
    }
    [HttpGet("/AppTokens/AwaitingMyReview")]
    public async Task<ActionResult<List<AppTokenIdDto>>> GetAppTokenICanReview()
    {
      return await Mediator.Send(new GetAppTokensICanReviewQuery());
    }
    [HttpGet("{id}/AppTokens")]
    public async Task<ActionResult<List<AppTokenIdDto>>> GetAppTokensByAppId([FromRoute] int id)
    {
      return await Mediator.Send(new GetAppTokenByAppIdQuery { Id = id });
    }
    [HttpPost("AuthJWT/{aid}/token")]
    public async Task<ActionResult<TokenOutput>> CreateAuthAppToken([FromRoute] string aid, [FromHeader] string xToken, CreateAuthAppTokenCommand command)
    {
      command.aId = aid;
      command.xToken = xToken;
      return await Mediator.Send(command);
    }
    [HttpPut("AppTokens/{id}/UpdateActions")]
    public async Task<ActionResult> UpdateAppTokenActions([FromRoute] int id, UpdateAppTokenActionsCommand command)
    {
      command.TokenId = id;
      await Mediator.Send(command);

      return NoContent();
    }
    [HttpPut("AppTokens/{id}/UpdateState")]
    public async Task<ActionResult> UpdateTokenState([FromRoute] int id, UpdateAppTokenStateCommand command)
    {
      command.Id = id;
      await Mediator.Send(command);
      return NoContent();
    }
    [HttpPost("{id}/GenerateAppSecret")]
    public async Task<ActionResult<ApplicationOutput>> GenerateAppSecret([FromRoute] int id, CreateAppSecretCommand command)
    {
      command.AppId = id;

      return await Mediator.Send(command);
    }
  }
}
