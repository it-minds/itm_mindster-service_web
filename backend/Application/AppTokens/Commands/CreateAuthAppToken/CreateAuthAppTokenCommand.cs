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
using Newtonsoft.Json;

namespace Application.AppTokens.Commands.CreateAuthAppToken
{
  [Authorize]
  public class CreateAuthAppTokenCommand : IRequest<TokenOutput>
  {
    [JsonIgnore]
    public string aId { get; set; }
    [JsonIgnore]
    public string xToken { get; set; }
    public TokenInput TokenInput { get; set; }

    public class CreateAuthAppTokenCommandHandler : IRequestHandler<CreateAuthAppTokenCommand, TokenOutput>
    {
      private readonly IApplicationDbContext _context;
      private readonly IAuthClient _authClient;
      private readonly ICurrentUserService _currentUserService;

      public CreateAuthAppTokenCommandHandler(IApplicationDbContext context, IAuthClient authClient, ICurrentUserService currentUserService)
      {
        _context = context;
        _authClient = authClient;
        _currentUserService = currentUserService;
      }

      public async Task<TokenOutput> Handle(CreateAuthAppTokenCommand request, CancellationToken cancellationToken)
      {
        var application = await _context.Applications.Where(e => e.AppIdentifier == request.aId).FirstOrDefaultAsync(cancellationToken);
        if (application == null) throw new NotFoundException(nameof(ApplicationEntity), key:request.aId + "Application doesn't exist");
        if (!await _context.AppOwners.AnyAsync(e => e.ApplicationId == application.Id && e.Email == _currentUserService.UserEmail, cancellationToken))
        {
          throw new NotFoundException(nameof(ApplicationEntity), application.Id + "Not authorized for the given Application");
        }

        var result =  await _authClient.TokenAsync(
          request.aId,
          request.xToken,
          request.TokenInput,
          cancellationToken);

        return result ;
      }

    }
  }
}
