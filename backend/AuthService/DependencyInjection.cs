using System.Diagnostics.CodeAnalysis;
using AuthService.Client;
using Microsoft.Extensions.DependencyInjection;

namespace AuthService
{
  [ExcludeFromCodeCoverage]
  public static class DependencyInjection
  {
    public static IServiceCollection AddAuthService(this IServiceCollection services)
    {
      services.AddTransient<BaseConfig>();
      services.AddHttpClient<IAuthClient, AuthClient>();
      return services;
    }
  }
}
