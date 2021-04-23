using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.AppTokens.Queries.GetAppTokens
{
  public class GetAppTokensICanReviewQuery : IRequest<List<AppTokenIdDto>>
  {
    public class GetAppTokensICanReviewQueryHandler : IRequestHandler<GetAppTokensICanReviewQuery, List<AppTokenIdDto>>
    {
      private readonly IApplicationDbContext _context;
      private readonly IMapper _mapper;
      private readonly ICurrentUserService _currentUserService;

      public GetAppTokensICanReviewQueryHandler(IApplicationDbContext context, IMapper mapper, ICurrentUserService currentUserService)
      {
        _context = context;
        _mapper = mapper;
        _currentUserService = currentUserService;
      }
      /**
       * Only returns AppTokens where the currentUser actually needs to and is authorized to approve/reject appTokenActions. 
       */
      public async Task<List<AppTokenIdDto>> Handle(GetAppTokensICanReviewQuery request, CancellationToken cancellationToken)
      {
        var appTokens = await _context.AppTokens.AsNoTracking()
            .Where(e => e.State == TokenStates.AwaitingReview)
            .Include(x => x.AppTokenActions)
            .ProjectTo<AppTokenIdDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);

        var actionsICanApprove = _context.ActionApprovers
          .Where(e => e.Email == _currentUserService.UserEmail);

        var tokensForReview = new List<AppTokenIdDto>();
        foreach (var token in appTokens)
        {
          var pendingActions = token.AppTokenActions
            .Where(e => e.State == ServiceStates.Pending)
            .Where(e => actionsICanApprove.Any(x => x.ActionId == e.ActionId))
            .ToList();
          token.AppTokenActions = pendingActions;
          if (pendingActions.Count != 0) tokensForReview.Add(token);

        }
        // Returns empty list if all tokens have 0 appTokenActions that the user can review.
        return tokensForReview;
      }
    }
  }
}
