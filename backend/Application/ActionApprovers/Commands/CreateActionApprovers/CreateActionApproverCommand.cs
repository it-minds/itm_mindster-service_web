using System.Collections.Generic;
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

namespace Application.ActionApprovers.Commands.CreateActionApprovers
{
  [Authorize]
  public class CreateActionApproverCommand : IRequest<int>
  {
    [JsonIgnore]
    public int Id { get; set; }
    public ICollection<ActionApproverDto> ActionApprovers { get; set; }

    public class CreateActionApproverCommandHandler : IRequestHandler<CreateActionApproverCommand, int>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;

      public CreateActionApproverCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
      {
        _context = context;
        _currentUserService = currentUserService;
      }

      public async Task<int> Handle(CreateActionApproverCommand request, CancellationToken cancellationToken)
      {
        if (!await _context.Actions.AnyAsync(e => e.Id == request.Id, cancellationToken))
        {
          throw new NotFoundException(nameof(Action), request.Id);
        }
        if (!await _context.ActionApprovers.AnyAsync(e => e.ActionId == request.Id && e.Email == _currentUserService.UserEmail, cancellationToken))
        {
          throw new NotFoundException(nameof(Action), request.Id + "Not authorized for the given Action");
        }

        var newApprovers = request.ActionApprovers
          .Where(a => !_context.ActionApprovers.Any(e => e.Email == a.Email && e.ActionId == request.Id))
          .Select(e => new ActionApprover
          {
            ActionId = request.Id,
            Email = e.Email
          });
        var result = newApprovers.Count();
        _context.ActionApprovers.AddRange(newApprovers);
        await _context.SaveChangesAsync(cancellationToken);

        return result;
      }
    }

  }
}
