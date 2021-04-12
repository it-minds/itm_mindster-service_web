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
    public AppTokenDto AppToken { get; set; }

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
        var token = _context.AppTokens.Find(request.TokenId);
        if (token == null)
        {
          throw new NotFoundException(nameof(AppToken), request.TokenId);
        }
        if (!_context.AppOwners.Any(e => e.ApplicationId == token.ApplicationId && e.Email == _currentUserService.UserEmail))
        {
          throw new NotFoundException(nameof(Domain.Entities.AppToken), request.TokenId + "Not authorized for the given Token");
        }

        var serviceActions = _context.Actions;
        var existingActions = _context.AppTokenActions.Where(e => e.AppTokenId == request.TokenId);
        var newActions = request.AppToken.AppTokenActions
          .Where(a => !existingActions.Any(e => e.ActionId == a.ActionId))
          .Where(a => serviceActions.Any(e => e.Id == a.ActionId))
          .Select(e => new AppTokenAction
          {
            ActionId = e.ActionId,
            AppTokenId = request.TokenId
          });

        //var appTokenActions = new List<AppTokenAction>{};

        //foreach (var tokenAction in request.AppToken.AppTokenActions)
        //{
        //  if (!await actions.AnyAsync(e => e.Id == tokenAction.ActionId, cancellationToken))
        //  {
        //    throw new NotFoundException(nameof(Action), tokenAction.ActionId);
        //  }

        //  var entity = new AppTokenAction
        //  {
        //    ActionId = tokenAction.ActionId,
        //    AppTokenId = request.TokenId,
        //    State = ServiceStates.Pending
        //  };
        //  appTokenActions.Add(entity);

        //}
        var result = newActions.Count();

        _context.AppTokenActions.AddRange(newActions);

        await _context.SaveChangesAsync(cancellationToken);


        return result;
      }

    }
  }
}
