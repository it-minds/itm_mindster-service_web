using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokens.Commands.UpdateAppTokenActions
{
  [Authorize]
  public class UpdateAppTokenCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }
    public AppTokenUpdateDto AppToken { get; set; }

    public class UpdateAppTokenCommandHandler : IRequestHandler<UpdateAppTokenCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;

      public UpdateAppTokenCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
      {
        _context = context;
        _currentUserService = currentUserService;
      }

      public async Task<Unit> Handle(UpdateAppTokenCommand request, CancellationToken cancellationToken)
      {
        var appToken = _context.AppTokens.Find(request.Id);
        if (appToken == null) throw new NotFoundException(nameof(Domain.Entities.AppToken), request.Id);

        if (appToken.AppTokenActions.Count != request.AppToken.AppTokenActions.Count)
        {
          throw new NotFoundException("Expected: " + appToken.AppTokenActions.Count + " actions but received: " + request.AppToken.AppTokenActions.Count);
        }

        for (var i = 0; i < appToken.AppTokenActions.Count; i++)
        {
          var action = appToken.AppTokenActions.ToList()[i];
          var updateInfo = request.AppToken.AppTokenActions.ToList()[i];
          action.State = updateInfo.State;
          action.RejectionReason = updateInfo.RejectionReason;

        }
        appToken.State = TokenStates.Reviewed;

        _context.AppTokens.Update(appToken);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
