using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.ExampleChildren;
using Application.ExampleChildren.Queries.GetExampleChildren;
using Application.Services;
using Application.Services.Queries;
using AutoMapper;
using FluentAssertions;
using Infrastructure.Persistence;
using Xunit;

namespace Application.UnitTests.Services.Queries.GetServices
{
  [Collection("QueryTests")]
  public class GetServicesQueryTest
  {
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetServicesQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
    }

    [Fact]
    public async Task Handle_ReturnsCorrectVmAndServicesCount()
    {
      var query = new GetServicesQuery();

      var handler = new GetServicesQuery.GetServicesQueryHandler(_context, _mapper);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<ServiceIdDto>>();
      result.Count.Should().Be(3);
      result[0].Actions.Count.Should().Be(2);
      result[2].Actions.Count.Should().Be(2);

    }
  }
}
