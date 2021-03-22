using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokens.Queries.GetAppTokens
{
  public class GetAppTokensQuery : IRequest<List<AppTokenIdDto>>
  {
    [JsonIgnore]
    public bool OnlyPending { get; set; }
 
    public class GetAppTokensQueryHandler : IRequestHandler<GetAppTokensQuery, List<AppTokenIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetAppTokensQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }

      public async Task<List<AppTokenIdDto>> Handle(GetAppTokensQuery request, CancellationToken cancellationToken)
      {
        var appTokens = await _context.AppTokens
          .Include(x => x.AppTokenActions)
          .ProjectTo<AppTokenIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        if (!request.OnlyPending) return appTokens;
        var pendingTokens = new List<AppTokenIdDto> { };
        foreach (var token in appTokens)
        {
          var isPending = true;
          foreach (var action in token.AppTokenActions)
          {
            if (action.State != ServiceStates.Pending)
            {
              isPending = false;
            }
          }

          if (isPending)
          {
            pendingTokens.Add(token);
          }
        }

        return pendingTokens;

      }
    }
  }
}
