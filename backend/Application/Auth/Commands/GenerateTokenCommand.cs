using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;


namespace Application.Auth.Commands
{
  public class GenerateTokenCommand : IRequest<string>
  {
    public class CreateActionCommandHandler : IRequestHandler<GenerateTokenCommand, string>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;
      private readonly ITokenService _tokenService;

      public CreateActionCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService, ITokenService tokenService)
      {
        _context = context;
        _currentUserService = currentUserService;
        _tokenService = tokenService;
      }

      public async Task<string> Handle(GenerateTokenCommand request, CancellationToken cancellationToken)
      {
        var token = _tokenService.CreateToken(new ApplicationOwner
        {
          Email = _currentUserService.UserEmail
        });
        return token;
      }
    }
  }
}
