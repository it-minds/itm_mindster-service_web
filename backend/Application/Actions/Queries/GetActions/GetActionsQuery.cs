using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Actions.Queries.GetActions
{
  public class GetActionsQuery : IRequest<List<ActionIdDto>>
  {
    public class GetActionsQueryHandler : IRequestHandler<GetActionsQuery, List<ActionIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;

      public GetActionsQueryHandler(IApplicationDbContext context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }

      public async Task<List<ActionIdDto>> Handle(GetActionsQuery request, CancellationToken cancellationToken)
      {
        var viewModel = await _context.Actions
          .Include(x => x.Service)
          .ProjectTo<ActionIdDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);


        return viewModel;
      }
    }
  }
}
