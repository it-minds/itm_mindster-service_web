using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokens.Queries.GetAppTokens
{
  public class GetAppTokenByAppIdQuery : IRequest<List<AppTokenIdDto>>
  {
    [JsonIgnore]
    public int Id { get; set; }
    public class GetAppTokenByAppIdQueryHandler : IRequestHandler<GetAppTokenByAppIdQuery, List<AppTokenIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUserService;
      public GetAppTokenByAppIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
      {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
      }

      public async Task<List<AppTokenIdDto>> Handle(GetAppTokenByAppIdQuery request, CancellationToken cancellationToken)
      {
        if (!await _context.AppOwners.AnyAsync(e => e.ApplicationId == request.Id && e.Email == _currentUserService.UserEmail, cancellationToken))
        {
          throw new NotFoundException(nameof(ApplicationOwner), "You have don't own the requested application");
        }
        var appTokens = await _context.AppTokens
          .Include(x => x.AppTokenActions)
          .Where(e => e.ApplicationId == request.Id)
          .ProjectTo<AppTokenIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);
        return appTokens;
      }
    }
  }
}
