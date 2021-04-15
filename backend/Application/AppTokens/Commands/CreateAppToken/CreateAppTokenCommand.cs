using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokens.Commands.CreateAppToken
{
  [Authorize]
  public class CreateAppTokenCommand : IRequest<int>
  {
    [JsonIgnore]
    public int Id { get; set; }
    public AppTokenCreateDto AppToken { get; set; }

    public class CreateAppTokenCommandHandler : IRequestHandler<CreateAppTokenCommand, int>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;

      public CreateAppTokenCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
      {
        _context = context;
        _currentUserService = currentUserService;
      }

      public async Task<int> Handle(CreateAppTokenCommand request, CancellationToken cancellationToken)
      {
        if (!await _context.Applications.AnyAsync(e => e.Id == request.Id, cancellationToken)) throw new NotFoundException(nameof(ApplicationEntity), request.Id);
        if (!await _context.AppOwners.AnyAsync(e => e.ApplicationId == request.Id && e.Email == _currentUserService.UserEmail, cancellationToken))
        {
          throw new NotFoundException(nameof(ApplicationEntity), request.Id + "Not authorized for the given Application");

        }
        if (await _context.AppTokens.AnyAsync(e => e.TokenIdentifier == request.AppToken.TokenIdentifier && e.ApplicationId == request.Id, cancellationToken))
        {
          throw new NotFoundException(nameof(Domain.Entities.AppToken),
            key: request.Id + "A Token with that identifier already exists");
        }
        
        var appToken = new AppToken()
        {
          ApplicationId = request.Id,
          Description = request.AppToken.Description,
          TokenIdentifier = request.AppToken.TokenIdentifier,
          State = TokenStates.Created
        };

        _context.AppTokens.Add(appToken);

        await _context.SaveChangesAsync(cancellationToken);

        return appToken.Id;
      }

    }
  }
}
