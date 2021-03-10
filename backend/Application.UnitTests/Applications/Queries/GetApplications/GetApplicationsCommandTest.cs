using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Applications;
using Application.Applications.Queries.GetApplications;
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

    public GetApplicationsQueryTest(QueryTestFixture fixture)
    {
      _context = fixture.Context;
      _mapper = fixture.Mapper;
    }

    [Fact]
    public async Task Handle_ReturnsCorrectVmAndApplicationsCount()
    {
      var query = new GetApplicationsQuery();

      var handler = new GetApplicationsQuery.GetApplicationQueryHandler(_context, _mapper);

      var result = await handler.Handle(query, CancellationToken.None);

      result.Should().BeOfType<List<ApplicationIdDto>>();
      result.Count.Should().Be(3);
    }
  }
}
