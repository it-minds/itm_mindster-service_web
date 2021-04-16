using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTokens;
using Application.AppTokens.Commands.UpdateAppTokenActions;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Enums;
using MediatR;
using Newtonsoft.Json;

namespace Application.AppTokenActions.Commands.UpdateAppTokenActions
{
  [Authorize]
  public class UpdateAppTokenActionsCommand : IRequest
  {
    [JsonIgnore] public int Id { get; set; }
    public AppTokenUpdateDto AppToken { get; set; }

    public class UpdateAppTokenActionsCommandHandler : IRequestHandler<UpdateAppTokenActionsCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;

      public UpdateAppTokenActionsCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
      {
        _context = context;
        _currentUserService = currentUserService;
      }

      public async Task<Unit> Handle(UpdateAppTokenActionsCommand request, CancellationToken cancellationToken)
      {
        var appToken = _context.AppTokens.Find(request.Id);
        if (appToken == null) throw new NotFoundException(nameof(Domain.Entities.AppToken), request.Id);

        var appTokenActions = appToken.AppTokenActions.ToList();
        var actionsICanApprove = _context.ActionApprovers
          .Where(e => e.Email == _currentUserService.UserEmail);

        foreach (var updatedAction in request.AppToken.AppTokenActions)
        {
          var action = appTokenActions.Find(e => e.Id == updatedAction.Id);
          if (action == null)
            throw new NotFoundException(
              nameof(Domain.Entities.AppTokenAction) + "Actions isn't included in the current AppToken", request.Id);
          if (!actionsICanApprove.Any(e => e.ActionId == action.Id))
          {
            throw new NotFoundException("You aren't a approver of action " + action.ActionId);
          }

          action.State = updatedAction.State;
          action.RejectionReason = updatedAction.RejectionReason;
        }

        if (appToken.AppTokenActions.Any(e => e.State != ServiceStates.Pending)) appToken.State = TokenStates.Reviewed;
        _context.AppTokens.Update(appToken);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}