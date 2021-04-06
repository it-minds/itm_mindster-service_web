using Microsoft.Extensions.Options;

namespace AuthService.Client
{
  public class BaseConfig
  {
    public string Auth { get; set; }
    public string BaseUrl { get; set; }

    public BaseConfig(IOptions<AuthServiceOptions> options)
    {
      BaseUrl = options.Value.Url;
      Auth = options.Value.Token;
    }
  }
}
