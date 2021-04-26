using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.ActionApprovers;
using Application.ActionApprovers.Queries.GetActionApproversByActionId;
using Application.ActionApprovers.Queries.GetActionApproversByServiceId;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.ServiceOwners;
using Application.ServiceOwners.Queries.GetServiceOwnersByServiceId;
using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using Xunit;

namespace Application.UnitTests.ActionApprovers.Queries
{
  [Collection("QueryTests")]
  public class GetActionApproversByServiceIdQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly ICurrentUserService _invalidUserService;
    public GetActionApproversByServiceIdQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
      _currentUserService = fixture.currentUserServiceMock.Object;
      _invalidUserService = fixture.InvalidUserServiceMock.Object;
    }
    [Fact]
    public async Task Handle_ReturnsCorrectVmAndApproversCount()
    {
      var query = new GetActionApproversByServiceIdQuery
      {
        Id = 1
      };

      var handler = new GetActionApproversByServiceIdQuery.GetActionApproversByServiceIdQueryHandler(_context, _mapper, _currentUserService);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<ActionApproverIdDto>>();
      result.Count.Should().Be(3); // Service 1 currently has 2 actions with a total of 3 approvers
    }
    [Fact]
    public void Handle_InvalidUser_ShouldThrowError()
    {
      var query = new GetActionApproversByServiceIdQuery
      {
        Id = 1
      };

      var handler = new GetActionApproversByServiceIdQuery.GetActionApproversByServiceIdQueryHandler(_context, _mapper, _invalidUserService);

      Func<Task> action = async () => await handler.Handle(query, CancellationToken.None);
      action.Should().Throw<NotFoundException>();
    }
  }
}
