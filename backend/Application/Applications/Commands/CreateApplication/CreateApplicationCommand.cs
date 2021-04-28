using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using AuthService.Client;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Applications.Commands.CreateApplication
{
  [Authorize]
  public class CreateApplicationCommand : IRequest<int>
  {
    public ApplicationDto Application { get; set; }

    public class CreateApplicationCommandHandler : IRequestHandler<CreateApplicationCommand, int>
    {
      private readonly IApplicationDbContext _context;

      private readonly ICurrentUserService _currentUserService;

      public CreateApplicationCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
      {
        _context = context;
        _currentUserService = currentUserService;
      }

      public async Task<int> Handle(CreateApplicationCommand request, CancellationToken cancellationToken)
      {
        if (await _context.Applications.AnyAsync(e => e.AppIdentifier == request.Application.AppIdentifier, cancellationToken))
        {
          throw new DuplicateIdentifierException(nameof(ApplicationEntity), key: request.Application.AppIdentifier);
        }
        var application = new ApplicationEntity
        {
          Title = request.Application.Title,
          Description = request.Application.Description,
          AppIdentifier = request.Application.AppIdentifier
        };

        _context.Applications.Add(application);

        await _context.SaveChangesAsync(cancellationToken);

        var applicationOwner = new ApplicationOwner
        {
          ApplicationId = application.Id,
          Email = _currentUserService.UserEmail
        };
        _context.AppOwners.Add((applicationOwner));
        await _context.SaveChangesAsync(cancellationToken);

        return application.Id;
      }
    }
  }
}
