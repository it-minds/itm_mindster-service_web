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

namespace Application.ActionApprovers.Queries.GetActionApproversByServiceId
{
  [Authorize]
  public class GetActionApproversByServiceIdQuery : IRequest<List<ActionApproverIdDto>>
  {
    public int Id { get; set; }
    public class GetActionApproversByServiceIdQueryHandler : IRequestHandler<GetActionApproversByServiceIdQuery, List<ActionApproverIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUserService;
      public GetActionApproversByServiceIdQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
      {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
      }
      public async Task<List<ActionApproverIdDto>> Handle(GetActionApproversByServiceIdQuery request, CancellationToken cancellationToken)
      {
        var actions = _context.Actions.Where(e => e.ServiceId == request.Id);
        var owners = _context.ActionApprovers.Where(e => actions.Any(x => x.Id == e.ActionId));
        if (!owners.Any(e => e.Email == _currentUserService.UserEmail))
        {
          throw new NotFoundException(nameof(ActionApprover), "You don't have permission for action:" + request.Id);
        }
        var result = await owners.ProjectTo<ActionApproverIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);
        return result;
      }
    }
  }
}
