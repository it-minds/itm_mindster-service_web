using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokens.Commands
{
  public class CreateAppTokenCommand : IRequest<int>
  {
    [JsonIgnore]
    public int Id { get; set; }
    public AppTokenCreateDto AppToken { get; set; }

    public class CreateAppTokenCommandHandler : IRequestHandler<CreateAppTokenCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateAppTokenCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateAppTokenCommand request, CancellationToken cancellationToken)
      {
        var appToken = new AppToken()
        {
          ApplicationId = request.Id,
          Description = request.AppToken.Description
        };

        if (!await _context.Applications.AnyAsync(e => e.Id == request.Id, cancellationToken))
        {
          throw new NotFoundException(nameof(ApplicationEntity), request.Id);
        }

        _context.AppTokens.Add(appToken);

        await _context.SaveChangesAsync(cancellationToken);

        return appToken.Id;
      }

    }
  }
}
