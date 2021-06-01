using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTokens;
using Application.AppTokens.Queries.GetAppTokens;
using Application.Common.Interfaces;
using AutoMapper;
using Domain.Enums;
using FluentAssertions;
using Infrastructure.Persistence;
using Xunit;

namespace Application.UnitTests.AppTokens.Queries
{
  [Collection("QueryTests")]
  public class GetAppTokensICanReviewQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly ICurrentUserService _invalidUserService;

    public GetAppTokensICanReviewQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
      _currentUserService = fixture.currentUserServiceMock.Object;
      _invalidUserService = fixture.InvalidUserServiceMock.Object;
    }
    [Fact]
    public async Task HandleUserHasAppTokenActionsToReview_ReturnsCorrectTokensCount()
    {
      var query = new GetAppTokensICanReviewQuery();

      var handler = new GetAppTokensICanReviewQuery.GetAppTokensICanReviewQueryHandler(_context, _mapper, _currentUserService);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<AppTokenIdDto>>();
      result.Count.Should().Be(1);
      result[0].AppTokenActions.Count.Should().Be(2); // only 2 out of 3 appTokenActions for token 1 are still awaiting review
      result.All(e => e.State == TokenStates.AwaitingReview).Should().BeTrue();
      result.All(e => e.AppTokenActions.All(x => x.State == ServiceStates.Pending)).Should().BeTrue();

    }
    [Fact]
    public async Task HandleUserWithNoActionsToApprove_ShouldReturnEmptyTokenList()
    {
      var query = new GetAppTokensICanReviewQuery();

      var handler = new GetAppTokensICanReviewQuery.GetAppTokensICanReviewQueryHandler(_context, _mapper, _invalidUserService);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<AppTokenIdDto>>();
      result.Count.Should().Be(0);
    }
  }
}
