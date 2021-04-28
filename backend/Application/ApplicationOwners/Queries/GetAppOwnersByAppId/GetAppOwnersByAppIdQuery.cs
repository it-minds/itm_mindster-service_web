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

namespace Application.ApplicationOwners.Queries.GetAppOwnersByAppId
{
  [Authorize]
  public class GetAppOwnersByAppIdQuery : IRequest<List<ApplicationOwnerIdDto>>
  {
    public int Id { get; set; }
    public class GetAppOwnersByAppIdQueryHandler : IRequestHandler<GetAppOwnersByAppIdQuery, List<ApplicationOwnerIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUserService;


      public GetAppOwnersByAppIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
      {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;

      }

      public async Task<List<ApplicationOwnerIdDto>> Handle(GetAppOwnersByAppIdQuery request, CancellationToken cancellationToken)
      {
        var owners = _context.AppOwners.Where(e => e.ApplicationId == request.Id);
        if (!owners.Any(e => e.Email == _currentUserService.UserEmail))
        {
          throw new ForbiddenAccessException(nameof(ApplicationEntity), key: request.Id);
        }
        var result = await owners.ProjectTo<ApplicationOwnerIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);

        return result;
      }


    }

  }
}
