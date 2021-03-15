using AuthService.Client;
using Infrastructure.Persistence;
using System;

namespace Application.UnitTests
{
  public class CommandTestBase : IDisposable
  {
    public CommandTestBase()
    {
      Context = ApplicationDbContextFactory.Create();
      AuthCient = new AuthTestService();
    }

    public ApplicationDbContext Context { get; }
    public IAuthClient AuthCient { get; }

    public void Dispose()
    {
      ApplicationDbContextFactory.Destroy(Context);
    }
  }
}
