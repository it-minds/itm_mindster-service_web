using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Applications;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokens.Commands.Update
{
  public class UpdateAppTokenCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }
    public AppTokenUpdateDto AppToken { get; set; }

    public class UpdateAppTokenCommandHandler : IRequestHandler<UpdateAppTokenCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      public UpdateAppTokenCommandHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }

      public async Task<Unit> Handle(UpdateAppTokenCommand request, CancellationToken cancellationToken)
      {
        var appToken = await _context.AppTokens
          .Where(e => e.Id == request.Id)
          .Include(e => e.AppTokenActions)
          .FirstOrDefaultAsync(cancellationToken);

        if (appToken == null)
        {
          throw new NotFoundException(nameof(Domain.Entities.AppToken), request.Id);
        }

        Console.WriteLine("========****========================");
        Console.WriteLine(appToken.AppTokenActions.Count);
        Console.WriteLine(appToken.AppTokenActions.First().RejectionReason);
        Console.WriteLine(appToken.AppTokenActions.Count +" www" + appToken.AppTokenActions.ToList()[0].ActionId+" adawdwa  "+ appToken.AppTokenActions.ToList().Count);
        for (var i = 0; i < appToken.AppTokenActions.Count; i++)
        {
          var action = appToken.AppTokenActions.ToList()[i];
          var updateInfo = request.AppToken.AppTokenActions.ToList()[i];

          action.State = updateInfo.State;
          action.RejectionReason = updateInfo.RejectionReason;

        }

        _context.AppTokens.Update(appToken);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
