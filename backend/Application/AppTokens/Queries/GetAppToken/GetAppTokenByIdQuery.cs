using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokens.Queries.GetAppToken
{
  [Authorize]
  public class GetAppTokenByIdQuery : IRequest<AppTokenIdDto>
  {
    [JsonIgnore]
    public int Id { get; set; }
    public class GetAppTokenByIdQueryHandler : IRequestHandler<GetAppTokenByIdQuery,AppTokenIdDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUserService;
      public GetAppTokenByIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
      {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
      }

      public async Task<AppTokenIdDto> Handle(GetAppTokenByIdQuery request, CancellationToken cancellationToken)
      {
        var appToken = await _context.AppTokens
          .Include(x => x.AppTokenActions)
          .Where(e => e.Id == request.Id)
          .ProjectTo<AppTokenIdDto>(_mapper.ConfigurationProvider)
          .FirstOrDefaultAsync(cancellationToken);
        if (appToken == null) throw new NotFoundException(nameof(appToken), request.Id);
        if (!_context.AppOwners.Any(e => e.Email == _currentUserService.UserEmail && e.ApplicationId == _context.AppTokens.Find(request.Id).ApplicationId))
        {
          throw new NotFoundException(nameof(AppToken), "You don't own the requested appToken");
        }
        return appToken;
      }
    }
  }
}
