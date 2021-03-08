using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.Services.Queries
{
  public class GetServiceByIdQuery : IRequest<ServiceIdDto>
  {
    [JsonIgnore]
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
        var service = await _context.Services
          .Where(e => e.Id == request.Id)
          .Include(e => e.Actions)
          .ProjectTo<ServiceIdDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync(cancellationToken);

        if (service == null)
        {
          throw new NotFoundException(nameof(service), request.Id);
        }
        
        return service;
      }
    }
  }
}
