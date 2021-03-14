using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

namespace AuthService.Client
{
    public partial class BaseClient : BaseInterface
  {
    private readonly BaseConfig _config;
    public string BaseUrl { get => _config.BaseUrl; }

    public BaseClient(BaseConfig config) {
      _config = config;
    }

    public async Task<HttpRequestMessage> CreateHttpRequestMessageAsync(CancellationToken cancellationToken)
    {
      var request = new HttpRequestMessage();

      request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _config.Auth);

      return request;
    }
  }
}
