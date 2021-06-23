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
      /**
       * Method responsible for requesting access to a Service and x of its actions. The method can also receive empty arrays of actionsIds and in this case it
       * will see this as a request to remove all AppTokenActions that's connected to the given service. Therefor the method both handles create and delete off affected
       * appTokenActions. The returned result is the amount of actions of the given service that the AppToken currently wants access too.
       */
      public async Task<int> Handle(CreateAppTokenActionsCommand request, CancellationToken cancellationToken)
      {
        var token = await _context.AppTokens
          .Where(e => e.Id == request.TokenId)
          .Include(e => e.AppTokenActions)
          .FirstOrDefaultAsync(cancellationToken);
        if (token == null)
        {
          throw new NotFoundException(nameof(AppToken), request.TokenId);
        }
        if (!_context.AppOwners.Any(e => e.ApplicationId == token.ApplicationId && e.Email == _currentUserService.UserEmail))
        {
          throw new ForbiddenAccessException(nameof(Domain.Entities.AppToken), request.TokenId);
        }

        var service = await _context.Services
          .Where(e => e.Id == request.Service.ServiceId)
          .Include(e => e.Actions)
          .FirstOrDefaultAsync(cancellationToken);
        if (service == null)
        {
          throw new NotFoundException(nameof(Domain.Entities.Service), request.Service.ServiceId);
        }

        var alreadyRequested = token.AppTokenActions
          .Where(e => service.Actions.Any(d => d.Id == e.ActionId)).ToList();

        var newAdditions = request.Service.ActionIds
          .Where(a => alreadyRequested.All(e => e.ActionId != a))
          .Select(e => new AppTokenAction
          {
            ActionId = e,
            AppTokenId = request.TokenId
          });

        var removedActions = alreadyRequested
          .Where(e => request.Service.ActionIds.All(a => a != e.ActionId));

        var result = newAdditions.Count() + alreadyRequested.Count - removedActions.Count();

        _context.AppTokenActions.AddRange(newAdditions);
        _context.AppTokenActions.RemoveRange(removedActions);

        await _context.SaveChangesAsync(cancellationToken);

        return result;
      }
    }
  }
}
