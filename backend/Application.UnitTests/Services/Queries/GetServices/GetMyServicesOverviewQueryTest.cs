using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.ExampleChildren;
using Application.ExampleChildren.Queries.GetExampleChildren;
using Application.Services;
using Application.Services.Queries;
using Application.Services.Queries.GetServices;
using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using Xunit;

namespace Application.UnitTests.Services.Queries.GetServices
{
  [Collection("QueryTests")]
  public class GetMyServicesOverviewQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly ICurrentUserService _invalidUserService;

    public GetMyServicesOverviewQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
      _currentUserService = fixture.currentUserServiceMock.Object;
      _invalidUserService = fixture.InvalidUserServiceMock.Object;
    }

    [Fact]
    public async Task Handle_ReturnsCorrectVmAndServicesCount()
    {
      var query = new GetMyServicesOverviewQuery();

      var handler = new GetMyServicesOverviewQuery.GetMyServicesOverviewQueryHandler(_context, _mapper, _currentUserService);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<ServiceOverviewDto>>();
      result.Count.Should().Be(2);
    }

    [Fact]
    public async Task Handle_InvalidUser_ShouldThrowError()
    {
      var query = new GetMyServicesOverviewQuery();

      var handler = new GetMyServicesOverviewQuery.GetMyServicesOverviewQueryHandler(_context, _mapper, _invalidUserService);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<ServiceOverviewDto>>();
      result.Count.Should().Be(0); // Invalid user owns no services so should return empty array but not throw error
    }
  }
}
