using System.Threading.Tasks;
using AuthService.Client;
using Microsoft.Extensions.Options;

namespace GoogleService.Client
{
  public class BaseConfig
  {
    private readonly GoogleServiceOptions _googleOptions;
    private readonly AuthServiceOptions _authOptions;
    private readonly IAuthClient _authClient;

    public string BaseUrl { get => _googleOptions.Url; }

    public BaseConfig(IOptions<GoogleServiceOptions> options, IOptions<AuthServiceOptions> serviceOptions, IAuthClient authClient)
    {
      _googleOptions = options.Value;
      _authOptions = serviceOptions.Value;
      _authClient = authClient;
    }

    public async Task<string> GenerateSessionToken()
    {
      var sessionToken = await _authClient.GenerateAsync(_authOptions.AppId, _googleOptions.AppTokenId, _googleOptions.AppToken, _authOptions.AppSecret);

      return sessionToken;
    }
  }
}
