using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTokens;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokenActions.Commands.CreateAppTokenAction
{
  [Authorize]
  public class CreateAppTokenActionsCommand : IRequest<int>
  {
    [JsonIgnore]
    public int TokenId { get; set; }
    public RequestServiceActionsDto Service { get; set; }

    public class CreateAppTokenActionsCommandHandler : IRequestHandler<CreateAppTokenActionsCommand, int>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;

      public CreateAppTokenActionsCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
      {
        _context = context;
        _currentUserService = currentUserService;
      }
      public async Task<int> Handle(CreateAppTokenActionsCommand request, CancellationToken cancellationToken)
      {
        var token = await _context.AppTokens.FindAsync(request.TokenId);
        if (token == null)
        {
          throw new NotFoundException(nameof(AppToken), request.TokenId);
        }
        if (!_context.AppOwners.Any(e => e.ApplicationId == token.ApplicationId && e.Email == _currentUserService.UserEmail))
        {
          throw new ForbiddenAccessException(nameof(Domain.Entities.AppToken), request.TokenId);
        }

        var service = await _context.Services.FindAsync(request.Service.ServiceId);
        if (service == null)
        {
          throw new NotFoundException(nameof(Domain.Entities.Service), request.Service.ServiceId);
        }

        var alreadyRequested = token.AppTokenActions
          .Where(e => service.Actions.Any(d => d.Id == e.ActionId)).ToList();
        if (alreadyRequested.Count == service.Actions.Count) return 0;

        var newAdditions = request.Service.ActionIds
          .Where(a => alreadyRequested.All(e => e.ActionId != a))
          .Select(e => new AppTokenAction
          {
            ActionId = e,
            AppTokenId = request.TokenId
          });
        var removedActions = alreadyRequested
          .Where(e => !request.Service.ActionIds.Any(a => a == e.ActionId));

        var result = newAdditions.Count() + alreadyRequested.Count - removedActions.Count();

        _context.AppTokenActions.AddRange(newAdditions);
        _context.AppTokenActions.RemoveRange(removedActions);

        await _context.SaveChangesAsync(cancellationToken);


        return result;
      }

    }
  }
}
