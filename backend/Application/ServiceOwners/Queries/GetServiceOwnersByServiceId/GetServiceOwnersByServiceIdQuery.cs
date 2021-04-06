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

namespace Application.ServiceOwners.Queries.GetServiceOwnersByServiceId
{
  [Authorize]
  public class GetServiceOwnersByServiceIdQuery : IRequest<List<ServiceOwnerIdDto>>
  {
    public int Id { get; set; }
    public class GetServiceOwnersByServiceIdQueryHandler : IRequestHandler<GetServiceOwnersByServiceIdQuery, List<ServiceOwnerIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUserService;


      public GetServiceOwnersByServiceIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
      {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
      }

      public async Task<List<ServiceOwnerIdDto>> Handle(GetServiceOwnersByServiceIdQuery request, CancellationToken cancellationToken)
      {
        var owners = _context.ServiceOwners.Where(e => e.ServiceId == request.Id);
        if (!owners.Any(e => e.Email == _currentUserService.UserEmail))
        {
          throw new NotFoundException(nameof(ServiceOwner), "You don't have permission for Service:" + request.Id);
        }
        var result = await owners.ProjectTo<ServiceOwnerIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return result;
      }


    }

  }
}
