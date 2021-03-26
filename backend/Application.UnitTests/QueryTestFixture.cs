using Application.Common.Mappings;
using AutoMapper;
using Infrastructure.Persistence;
using System;
using Application.Common.Interfaces;
using Moq;
using Xunit;

namespace Application.UnitTests
{
  public sealed class QueryTestFixture : IDisposable
  {
    public QueryTestFixture()
    {
      Context = ApplicationDbContextFactory.Create();

      var configurationProvider = new MapperConfiguration(cfg =>
      {
        cfg.AddProfile<MappingProfile>();
      });

      Mapper = configurationProvider.CreateMapper();

      currentUserServiceMock = new Mock<ICurrentUserService>();
      currentUserServiceMock.Setup(m => m.UserEmail)
        .Returns("test@mail.dk");


    }
    public ApplicationDbContext Context { get; }

    public IMapper Mapper { get; }

    public Mock<ICurrentUserService> currentUserServiceMock { get; }

    public void Dispose()
    {
      ApplicationDbContextFactory.Destroy(Context);
    }
  }

  [CollectionDefinition("QueryTests")]
  public class QueryCollection : ICollectionFixture<QueryTestFixture> { }
}
