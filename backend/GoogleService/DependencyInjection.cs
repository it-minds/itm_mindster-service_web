using System.Diagnostics.CodeAnalysis;
using GoogleService.Client;
using Microsoft.Extensions.DependencyInjection;

namespace GoogleService
{
  [ExcludeFromCodeCoverage]
  public static class DependencyInjection
  {
    public static IServiceCollection AddGoogleService(this IServiceCollection services)
    {
      services.AddTransient<BaseConfig>();
      services.AddHttpClient<IGoogleClient, GoogleClient>();
      return services;
    }
  }
}
