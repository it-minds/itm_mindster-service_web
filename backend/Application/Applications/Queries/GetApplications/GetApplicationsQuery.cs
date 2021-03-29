using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Application.Services;
using Application.Services.Queries.GetServices;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Applications.Queries.GetApplications
{
  [Authorize]
  public class GetApplicationsQuery : IRequest<List<ApplicationIdDto>>
  {
    public class GetApplicationQueryHandler : IRequestHandler<GetApplicationsQuery, List<ApplicationIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUserService;


      public GetApplicationQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
      {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;

      }

      public async Task<List<ApplicationIdDto>> Handle(GetApplicationsQuery request, CancellationToken cancellationToken)
      {
        var ownedApps = _context.AppOwners.Where(e => e.Email == _currentUserService.UserEmail)
          .Select(e => e.ApplicationId).ToList();
        if (!ownedApps.Any()) throw new NotFoundException(nameof(ApplicationOwner), "You have no application" + _currentUserService.UserEmail);

        var applications = await _context.Applications
          .Where(e => ownedApps.Contains(e.Id))
          .ProjectTo<ApplicationIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return applications;
      }


    }
  }
}
