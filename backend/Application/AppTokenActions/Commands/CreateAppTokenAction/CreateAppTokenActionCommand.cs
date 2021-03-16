using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTokens;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokenActions.Commands
{
  public class CreateAppTokenActionsCommand : IRequest<int>
  {
    [JsonIgnore]
    public int TokenId { get; set; }
    public AppTokenDto AppToken { get; set; }

    public class CreateAppTokenActionsCommandHandler : IRequestHandler<CreateAppTokenActionsCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateAppTokenActionsCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateAppTokenActionsCommand request, CancellationToken cancellationToken)
      {
        if (!await _context.AppTokens.AnyAsync(e => e.Id == request.TokenId, cancellationToken))
        {
          throw new NotFoundException(nameof(AppToken), request.TokenId);
        }

        var appTokenActions = new List<AppTokenAction>{};

        foreach (var tokenAction in request.AppToken.AppTokenActions)
        {
          if (!await _context.Actions.AnyAsync(e => e.Id == tokenAction.ActionId))
          {
            throw new NotFoundException(nameof(Action), tokenAction.ActionId);
          }

          var entity = new AppTokenAction
          {
            ActionId = tokenAction.ActionId,
            AppTokenId = request.TokenId,
            State = ServiceStates.Pending
          };
          appTokenActions.Add(entity);

        }

        _context.AppTokenActions.AddRange(appTokenActions);
        
        await _context.SaveChangesAsync(cancellationToken);

        return appTokenActions.Count;
      }

    }
  }
}
