using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;


namespace Application.Actions.Commands.CreateAction
{
  [Authorize]
  public class CreateActionCommand : IRequest<int>
  {
    [JsonIgnore]
    public int Id { get; set; }
    public ActionDto Action;

    public class CreateActionCommandHandler : IRequestHandler<CreateActionCommand, int>
    {
      private readonly IApplicationDbContext _context;

      private readonly ICurrentUserService _currentUserService;

      public CreateActionCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
      {
        _context = context;
        _currentUserService = currentUserService;
      }

      public async Task<int> Handle(CreateActionCommand request, CancellationToken cancellationToken)
      {

        if (!await _context.Services.AnyAsync(e => e.Id == request.Id, cancellationToken))
        {
          throw new NotFoundException(nameof(Service), request.Id);
        }

        if (!await _context.ServiceOwners.AnyAsync(
          e => e.ServiceId == request.Id && e.Email == _currentUserService.UserEmail, cancellationToken))
        {
          throw new ForbiddenAccessException(nameof(Service), key: request.Id);
        }
        if (await _context.Actions.AnyAsync(e => e.ActionIdentifier == request.Action.ActionIdentifier && e.ServiceId == request.Id, cancellationToken))
        {
          throw new DuplicateIdentifierException(nameof(Domain.Entities.Action), key: request.Action.ActionIdentifier);
        }


        var action = new Action
        {
          Title = request.Action.Title,
          ActionIdentifier = request.Action.ActionIdentifier,
          Description = request.Action.Description,
          AdminNote = request.Action.AdminNote,
          ServiceId = request.Id
        };

        _context.Actions.Add(action);

        await _context.SaveChangesAsync(cancellationToken);

        var actionApprover = new ActionApprover
        {
          ActionId = action.Id,
          Email = _currentUserService.UserEmail
        };
        _context.ActionApprovers.Add(actionApprover);
        await _context.SaveChangesAsync(cancellationToken);

        return action.Id;
      }
    }
  }
}
