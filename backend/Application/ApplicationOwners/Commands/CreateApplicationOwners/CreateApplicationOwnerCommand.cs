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

namespace Application.ApplicationOwners.Commands.CreateApplicationOwners
{
  [Authorize]
  public class CreateApplicationOwnerCommand : IRequest<int>
  {
    [JsonIgnore]
    public int Id { get; set; }
    public ICollection<ApplicationOwnerDto> AppOwners { get; set; }

    public class CreateApplicationOwnerCommandHandler : IRequestHandler<CreateApplicationOwnerCommand, int>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;

      public CreateApplicationOwnerCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
      {
        _context = context;
        _currentUserService = currentUserService;
      }

      public async Task<int> Handle(CreateApplicationOwnerCommand request, CancellationToken cancellationToken)
      {
        if (!await _context.Applications.AnyAsync(e => e.Id == request.Id, cancellationToken))
        {
          throw new NotFoundException(nameof(ApplicationEntity), request.Id);
        }
        if (!await _context.AppOwners.AnyAsync(e => e.ApplicationId == request.Id && e.Email == _currentUserService.UserEmail, cancellationToken))
        {
          throw new NotFoundException(nameof(ApplicationEntity), request.Id + "Not authorized for the given Application");
        }

        var newOwners =request.AppOwners
          .Where(a => !_context.AppOwners.Any(e => e.Email == a.Email && e.ApplicationId == request.Id))
          .Select(e => new ApplicationOwner
        {
          ApplicationId = request.Id,
          Email = e.Email
        });
        var result = newOwners.Count();
        _context.AppOwners.AddRange(newOwners);
        await _context.SaveChangesAsync(cancellationToken);

        return result;
      }
    }

  }
}
