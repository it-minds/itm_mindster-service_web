using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.ApplicationOwners;
using Application.ApplicationOwners.Queries.GetAppOwnersByAppId;
using Application.Applications;
using Application.Applications.Queries.GetApplications;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using Xunit;

namespace Application.UnitTests.ApplicationOwners.Queries
{
  [Collection("QueryTests")]
  public class GetAppOwnersByAppIdQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly ICurrentUserService _invalidUserService;
    public GetAppOwnersByAppIdQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
      _currentUserService = fixture.currentUserServiceMock.Object;
      _invalidUserService = fixture.InvalidUserServiceMock.Object;
    }
    [Fact]
    public async Task Handle_ReturnsCorrectVmAndOwnersCount()
    {
      var query = new GetAppOwnersByAppIdQuery
      {
        Id = 1
      };

      var handler = new GetAppOwnersByAppIdQuery.GetAppOwnersByAppIdQueryHandler(_context, _mapper, _currentUserService);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<ApplicationOwnerIdDto>>();
      result.Count.Should().Be(2); // Application 1 currently has 2 owners
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

      action.Should().Throw<NotFoundException>();
    }
  }
}
