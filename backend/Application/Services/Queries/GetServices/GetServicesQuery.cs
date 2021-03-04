using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Queries
{
  public class GetServicesQuery : IRequest<List<ServiceIdDto>>
  {
    public class GetServicesQueryHandler : IRequestHandler<GetServicesQuery, List<ServiceIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;


      public GetServicesQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;

      }

      public async Task<List<ServiceIdDto>> Handle(GetServicesQuery request, CancellationToken cancellationToken)
      {

        var services = await _context.Services
          .Include(x => x.Actions)
          .ProjectTo<ServiceIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return services;
      }
    }
  }
}
