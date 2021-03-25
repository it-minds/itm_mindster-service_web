using System.Collections.Generic;
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

namespace Application.Services.Queries.GetServices
{
  [Authorize]
  public class GetServicesQuery : IRequest<List<ServiceIdDto>>
  {
    [JsonIgnore]
    public bool OnlyMyServices { get; set; }
    public class GetServicesQueryHandler : IRequestHandler<GetServicesQuery, List<ServiceIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUserService;



      public GetServicesQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
      {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
      }

      public async Task<List<ServiceIdDto>> Handle(GetServicesQuery request, CancellationToken cancellationToken)
      {
        var services = new List<ServiceIdDto> { };
        if (request.OnlyMyServices)
        {
          var user = _context.ServiceOwners.Where(e => e.Email == _currentUserService.UserEmail)
            .Select(e => e.ServiceId);
          if (!user.Any()) throw new NotFoundException(nameof(ServiceOwner), "You have no services");

          return await _context.Services
            .Where(e => user.Contains(e.Id))
            .Include(x => x.Actions)
            .ProjectTo<ServiceIdDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        }

        services = await _context.Services
          .Include(x => x.Actions)
          .ProjectTo<ServiceIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return services;
      }
    }
  }
}
