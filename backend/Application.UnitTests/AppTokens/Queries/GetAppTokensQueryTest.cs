using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.ApplicationOwners;
using Application.ApplicationOwners.Queries.GetAppOwnersByAppId;
using Application.AppTokens;
using Application.AppTokens.Queries.GetAppTokens;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using Xunit;

namespace Application.UnitTests.AppTokens.Queries
{
  [Collection("QueryTests")]
  public class GetAppTokensQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly ICurrentUserService _invalidUserService;
    public GetAppTokensQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
      _currentUserService = fixture.currentUserServiceMock.Object;
      _invalidUserService = fixture.InvalidUserServiceMock.Object;
    }
    [Fact]
    public async Task HandleOnlyPending_ReturnsCorrectVmAndTokensCount()
    {
      var query = new GetAppTokensQuery{OnlyPending = true};

      var handler = new GetAppTokensQuery.GetAppTokensQueryHandler(_context, _mapper);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<AppTokenIdDto>>();
      result.ToList()[0].AppTokenActions.Count.Should().Be(2);
      result.ToList()[0].Description.Should().Be("Den første appToken");
      result.ToList()[0].Id.Should().Be(1);
      result.Count.Should().Be(1); // Currently 1 token has pending actions
    }
    [Fact]
    public async Task Handle_ReturnsAllCorrectVmAndTokensCount()
    {
      var query = new GetAppTokensQuery();

      var handler = new GetAppTokensQuery.GetAppTokensQueryHandler(_context, _mapper);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<AppTokenIdDto>>();
      result.ToList()[0].AppTokenActions.Count.Should().Be(2);
      result.ToList()[1].Description.Should().Be("Den anden appToken");
      result.ToList()[1].Id.Should().Be(2);
      result.Count.Should().Be(2); // Currently 1 token has pending actions
    }
  }
}
