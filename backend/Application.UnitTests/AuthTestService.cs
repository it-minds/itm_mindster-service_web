using System.Threading;
using System.Threading.Tasks;
using AuthService.Client;

#pragma warning disable 1998

namespace Application.UnitTests
{
  public class AuthTestService : IAuthClient
  {
    public string BaseUrl { get; set; }

    public async Task<Response> AppAsync(Test body)
    {
      return new Response
      {
        AppIdentifer = body.AppIdentifer,
        AppSecret = "MySecret"
      };
    }

    public async Task<Response> AppAsync(Test body, CancellationToken cancellationToken)
    {
      return await AppAsync(body);
    }

    public async Task<string> GenerateAsync(string aid, string tid, string x_jwt, string x_token)
    {
      throw new System.NotImplementedException();
    }

    public async Task<string> GenerateAsync(string aid, string tid, string x_jwt, string x_token, CancellationToken cancellationToken)
    {
      return await GenerateAsync(aid, tid, x_jwt, x_token);
    }

    public Task<string> PublickeyAsync(string aid)
    {
      throw new System.NotImplementedException();
    }

    public Task<string> PublickeyAsync(string aid, CancellationToken cancellationToken)
    {
      return PublickeyAsync(aid);
    }

    public Task<Response2> TokenAsync(string aid, string x_token, Body body)
    {
      throw new System.NotImplementedException();
    }

    public Task<Response2> TokenAsync(string aid, string x_token, Body body, CancellationToken cancellationToken)
    {
      return TokenAsync(aid, x_token, body);
    }
  }
}

#pragma warning restore 1998
