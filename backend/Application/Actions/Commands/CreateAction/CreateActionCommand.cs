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
        var action = new Action
        {
          Title = request.Action.Title,
          Description = request.Action.Description,
          AdminNote = request.Action.AdminNote,
          ServiceId = request.Id
        };
        var user = _context.ServiceOwners.Where(e => e.ServiceId == request.Id)
          .Where(e => e.Email == _currentUserService.UserEmail);

        if (!user.Any()) throw new NotFoundException(nameof(Service), request.Id+"Not authorized");
        if (!await _context.Services.AnyAsync(e => e.Id == request.Id, cancellationToken)) throw new NotFoundException(nameof(Service), request.Id);

        _context.Actions.Add(action);

        await _context.SaveChangesAsync(cancellationToken);

        return action.Id;
      }
    }
  }
}
