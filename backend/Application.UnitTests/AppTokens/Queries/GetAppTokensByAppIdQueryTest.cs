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
  public class GetAppTokensByAppIdQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly ICurrentUserService _invalidUserService;
    public GetAppTokensByAppIdQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
      _currentUserService = fixture.currentUserServiceMock.Object;
      _invalidUserService = fixture.InvalidUserServiceMock.Object;
    }
    [Fact]
    public async Task Handle_ReturnsCorrectVmAndTokensCount()
    {
      var query = new GetAppTokenByAppIdQuery
      {
        Id = 1
      };

      var handler = new GetAppTokenByAppIdQuery.GetAppTokenByAppIdQueryHandler(_context, _mapper, _currentUserService);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<AppTokenIdDto>>();
      result.ToList()[0].AppTokenActions.Count.Should().Be(3);
      result.ToList()[0].Description.Should().Be("Den første appToken");
      result.ToList()[0].Id.Should().Be(1);
      result.Count.Should().Be(1); // Application 1 currently has 1 token with 2 actions
    }
    [Fact]
    public void Handle_InvalidUser_ShouldThrowError()
    {
      var query = new GetAppOwnersByAppIdQuery
      {
        Id = 1
      };

      var handler = new GetAppOwnersByAppIdQuery.GetAppOwnersByAppIdQueryHandler(_context, _mapper, _invalidUserService);

      Func<Task> action = async () => await handler.Handle(query, CancellationToken.None);

      action.Should().Throw<ForbiddenAccessException>();
    }
  }
}
