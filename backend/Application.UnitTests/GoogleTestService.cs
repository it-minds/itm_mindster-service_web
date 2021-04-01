using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using GoogleService.Client;

#pragma warning disable 1998

namespace Application.UnitTests
{
  public class GoogleTestService : IGoogleClient
  {
    public string BaseUrl { get; set; }

    public Task<GoogleUserResponse> AnonymousAsync(string domain, string nextPageToken)
    {
      return AnonymousAsync(domain, nextPageToken, CancellationToken.None);
    }

    public async Task<GoogleUserResponse> AnonymousAsync(string domain, string nextPageToken, CancellationToken cancellationToken)
    {
      return new GoogleUserResponse
      {
        Error = false,
        Result = new Result
        {
          NextPageToken = null,
          Users = new List<User>() {
            new User {
              Name = new Name {
                FamilyName = "Testman",
                GivenName = "Testoro del Testo",
                FullName = "Testoro del Testo Testman"
              },
              PrimaryEmail = "test@it-minds.dk",
              ThumbnailPhotoUrl = "img.png"
            }
          }
        }
      };
    }
  }
}

#pragma warning restore 1998
