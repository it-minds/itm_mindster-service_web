using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Applications.Queries.GetApplications
{
  public class GetMyAppOverviewQuery : IRequest<List<AppOverviewDto>>
  {
    public class GetMyAppOverviewQueryHandler : IRequestHandler<GetMyAppOverviewQuery, List<AppOverviewDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUserService;

      public GetMyAppOverviewQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
      {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;

      }

      public async Task<List<AppOverviewDto>> Handle(GetMyAppOverviewQuery request, CancellationToken cancellationToken)
      {
        var ownedApps = _context.AppOwners.Where(e => e.Email == _currentUserService.UserEmail)
          .Select(e => e.ApplicationId).ToList();

        var applications = await _context.Applications
          .Where(e => ownedApps.Contains(e.Id))
          .ProjectTo<AppOverviewDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return applications;
      }


    }
  }
}
