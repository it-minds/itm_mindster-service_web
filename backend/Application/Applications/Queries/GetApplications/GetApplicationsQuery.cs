using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Services;
using Application.Services.Queries.GetServices;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Applications.Queries.GetApplications
{
  public class GetApplicationsQuery : IRequest<List<ApplicationIdDto>>
  {
    public class GetApplicationQueryHandler : IRequestHandler<GetApplicationsQuery, List<ApplicationIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;


      public GetApplicationQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;

      }

      public async Task<List<ApplicationIdDto>> Handle(GetApplicationsQuery request, CancellationToken cancellationToken)
      {

        var applications = await _context.Applications
          .ProjectTo<ApplicationIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return applications;
      }


    }
  }
}
