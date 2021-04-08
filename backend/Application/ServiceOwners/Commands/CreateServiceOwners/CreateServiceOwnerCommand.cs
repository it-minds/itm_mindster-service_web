using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.ApplicationOwners;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.ServiceOwners.Commands.CreateServiceOwners
{
  [Authorize]
  public class CreateServiceOwnerCommand : IRequest<int>
  {
    [JsonIgnore]
    public int Id { get; set; }
    public ICollection<ServiceOwnerDto> ServiceOwners { get; set; }

    public class CreateServiceOwnersCommandHandler : IRequestHandler<CreateServiceOwnerCommand, int>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;

      public CreateServiceOwnersCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
      {
        _context = context;
        _currentUserService = currentUserService;
      }

      public async Task<int> Handle(CreateServiceOwnerCommand request, CancellationToken cancellationToken)
      {
        if (!await _context.Services.AnyAsync(e => e.Id == request.Id, cancellationToken))
        {
          throw new NotFoundException(nameof(Service), request.Id);
        }
        if (!await _context.ServiceOwners.AnyAsync(e => e.ServiceId == request.Id && e.Email == _currentUserService.UserEmail, cancellationToken))
        {
          throw new NotFoundException(nameof(ApplicationEntity), request.Id + "Not authorized for the given Application");
        }

        var existingOwners = _context.ServiceOwners.Where(e => e.ServiceId == request.Id);
        var newOwners = request.ServiceOwners
          .Where(a => !existingOwners.Any(e => e.Email == a.Email))
          .Select(e => new ServiceOwner
          {
            ServiceId = request.Id,
            Email = e.Email
          });
        var result = newOwners.Count();
        _context.ServiceOwners.AddRange(newOwners);
        await _context.SaveChangesAsync(cancellationToken);

        return result;
      }
    }

  }
}
