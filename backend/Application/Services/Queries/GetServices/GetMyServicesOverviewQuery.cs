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

namespace Application.Services.Queries.GetServices
{
  public class GetMyServicesOverviewQuery : IRequest<List<ServiceOverviewDto>>
  {
    public class GetMyServicesOverviewQueryHandler : IRequestHandler<GetMyServicesOverviewQuery, List<ServiceOverviewDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUserService;

      public GetMyServicesOverviewQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
      {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
      }

      public async Task<List<ServiceOverviewDto>> Handle(GetMyServicesOverviewQuery request, CancellationToken cancellationToken)
      {
        var ownedServices = _context.ServiceOwners
          .Where(e => e.Email == _currentUserService.UserEmail)
          .Select(e => e.ServiceId);
        if (!ownedServices.Any()) throw new NotFoundException(nameof(ServiceOwner), "You have no services");

        var services = await _context.Services
          .Where(e => ownedServices.Contains(e.Id))
          .ProjectTo<ServiceOverviewDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return services;
      }
    }
  }
}
