using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Applications;
using Application.Applications.Queries.GetApplications;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.ExampleChildren;
using Application.ExampleChildren.Queries.GetExampleChildren;
using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using Xunit;

namespace Application.UnitTests.Applications.Queries.GetApplications
{
  [Collection("QueryTests")]
  public class GetApplicationsQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly ICurrentUserService _invalidUserService;

    public GetApplicationsQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
      _currentUserService = fixture.currentUserServiceMock.Object;
      _invalidUserService = fixture.InvalidUserServiceMock.Object;
    }

    [Fact]
    public async Task Handle_ReturnsCorrectVmAndApplicationsCount()
    {
      var query = new GetMyApplicationsQuery();

      var handler = new GetMyApplicationsQuery.GetMyApplicationQueryHandler(_context, _mapper, _currentUserService);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<ApplicationIdDto>>();
      result.Count.Should().Be(2); // The test user currenlty owns 2 out of 3 Applications
    }
    [Fact]
    public async Task Handle_InvalidUser_ShouldReturnEmptyArray()
    {
      var query = new GetMyApplicationsQuery();

      var handler = new GetMyApplicationsQuery.GetMyApplicationQueryHandler(_context, _mapper, _invalidUserService);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<ApplicationIdDto>>();
      result.Count.Should().Be(0); // The invalid user just receives empty array since he owns no applications
    }
  }
}
