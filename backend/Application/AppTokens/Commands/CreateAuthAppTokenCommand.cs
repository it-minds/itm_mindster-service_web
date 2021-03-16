using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AuthService.Client;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokens.Commands
{
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

      public CreateAuthAppTokenCommandHandler(IApplicationDbContext context, IAuthClient authClient)
      {
        _context = context;
        _authClient = authClient;
      }

      public async Task<TokenOutput> Handle(CreateAuthAppTokenCommand request, CancellationToken cancellationToken)
      {
        
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
