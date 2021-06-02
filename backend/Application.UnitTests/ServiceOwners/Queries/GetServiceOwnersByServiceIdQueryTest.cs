using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.ApplicationOwners;
using Application.ApplicationOwners.Queries.GetAppOwnersByAppId;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.ServiceOwners;
using Application.ServiceOwners.Queries.GetServiceOwnersByServiceId;
using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using Xunit;

namespace Application.UnitTests.ServiceOwners.Queries
{
  [Collection("QueryTests")]
  public class GetServiceOwnersByServiceIdQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly ICurrentUserService _invalidUserService;
    public GetServiceOwnersByServiceIdQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
      _currentUserService = fixture.currentUserServiceMock.Object;
      _invalidUserService = fixture.InvalidUserServiceMock.Object;
    }
    [Fact]
    public async Task Handle_ReturnsCorrectVmAndOwnersCount()
    {
      var query = new GetServiceOwnersByServiceIdQuery
      {
        Id = 1
      };

      var handler = new GetServiceOwnersByServiceIdQuery.GetServiceOwnersByServiceIdQueryHandler(_context, _mapper, _currentUserService);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<ServiceOwnerIdDto>>();
      result.Count.Should().Be(2); // Service 1 currently has 2 owners
    }
    [Fact]
    public void Handle_InvalidUser_ShouldThrowError()
    {
      var query = new GetServiceOwnersByServiceIdQuery
      {
        Id = 1
      };

      var handler = new GetServiceOwnersByServiceIdQuery.GetServiceOwnersByServiceIdQueryHandler(_context, _mapper, _invalidUserService);

      Func<Task> action = async () => await handler.Handle(query, CancellationToken.None);

      action.Should().Throw<ForbiddenAccessException>();
    }
  }
}
