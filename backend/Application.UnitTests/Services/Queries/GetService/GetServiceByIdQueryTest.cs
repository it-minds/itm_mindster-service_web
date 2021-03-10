using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Services;
using Application.Services.Queries;
using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using Xunit;

namespace Application.UnitTests.Services.Queries.GetService
{
  [Collection("QueryTests")]
  public class GetServiceByIdQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetServiceByIdQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
    }

    [Fact]
    public async Task Handle_GivenValidId_ShouldReturnsPersistedServiceAndActions()
    {
      var query = new GetServiceByIdQuery
      {
        Id = 1
      };
      var handler = new GetServiceByIdQuery.GetServiceByIdQueryHandler(_context, _mapper);

      var result = await handler.Handle(query, CancellationToken.None);
      var entity = _context.Services.Find(query.Id);

      result.Should().BeOfType<ServiceIdDto>();
      result.Title.Should().Be(entity.Title);
      result.Description.Should().Be(entity.Description);
      result.State.Should().Be(entity.State);
      result.Actions.Count.Should().Be(entity.Actions.Count);
      result.Actions.First().Title.Should().Be(entity.Actions.First().Title);
    }
    [Fact]
    public void Handle_GivenInValidServiceId_ThrowsException()
    {
      var query = new GetServiceByIdQuery
      {
        Id = 99
      };
      var handler = new GetServiceByIdQuery.GetServiceByIdQueryHandler(_context, _mapper);
      Func<Task> action = async () => await handler.Handle(query, CancellationToken.None);

      action.Should().Throw<NotFoundException>();

    }
  }
}
