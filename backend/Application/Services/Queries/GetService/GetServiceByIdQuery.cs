using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Actions;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Queries
{
  public class GetServiceByIdQuery : IRequest<ServiceIdDto>
  {
    public int Id { get; set; }
    public class GetServiceByIdQueryHandler : IRequestHandler<GetServiceByIdQuery, ServiceIdDto>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;


      public GetServiceByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;

      }

      public async Task<ServiceIdDto> Handle(GetServiceByIdQuery request, CancellationToken cancellationToken)
      {
        var services = await _context.Services.Include(e => e.Actions)
          .ProjectTo<ServiceIdDto>(_mapper.ConfigurationProvider).ToListAsync();

        var service = services.Find(x => x.Id == request.Id);

        
        if (service == null)
        {
          throw new NotFoundException(nameof(service), request.Id);
        }
        
        return service ;
      }
    }
  }
}
