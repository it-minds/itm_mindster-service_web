using System.Threading;
using System.Threading.Tasks;
using Application.Applications.Commands.CreateApplication;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using AuthService.Client;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Applications.Commands.CreateAppSecret
{
  [Authorize]
  public class CreateAppSecretCommand : IRequest<ApplicationOutput>
  {
    public int AppId { get; set; }

    public class CreateAppSecretCommandHandler : IRequestHandler<CreateAppSecretCommand, ApplicationOutput>
    {
      private readonly IApplicationDbContext _context;

      private readonly IAuthClient _authClient;

      private readonly ICurrentUserService _currentUserService;

      public CreateAppSecretCommandHandler(IApplicationDbContext context, IAuthClient authClient, ICurrentUserService currentUserService)
      {
        _context = context;
        _authClient = authClient;
        _currentUserService = currentUserService;
      }

      public async Task<ApplicationOutput> Handle(CreateAppSecretCommand request, CancellationToken cancellationToken)
      {
        var application = await _context.Applications.FindAsync(request.AppId);

        if (application == null) throw new NotFoundException(nameof(ApplicationEntity), request.AppId);
        if (application.AppSecretGenerated) throw new ForbiddenAccessException("AppSecret has already been retrieved once, and can't be retrieved again");
        if (!await _context.AppOwners.AnyAsync(e => e.ApplicationId == request.AppId && e.Email == _currentUserService.UserEmail, cancellationToken))
        {
          throw new ForbiddenAccessException(nameof(ApplicationEntity), request.AppId);
        }

        application.AppSecretGenerated = true;
        await _context.SaveChangesAsync(cancellationToken);

        var authResult = await _authClient.AppAsync(new ApplicationInput
        {
          AppIdentifer = application.AppIdentifier
        }, cancellationToken);

        return authResult;
      }
    }
  }
}
