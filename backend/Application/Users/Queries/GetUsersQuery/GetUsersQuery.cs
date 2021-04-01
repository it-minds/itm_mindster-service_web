using System.Threading;
using System.Threading.Tasks;
using Application.Common.Security;
using MediatR;
using GoogleService.Client;
using System.Collections.Generic;

namespace Application.Users.Queries
{
  [Authorize]
  public class GetUsersQuery : IRequest<IEnumerable<User>>
  {
    public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, IEnumerable<User>>
    {
      private readonly IGoogleClient _googleClient;

      public GetUsersQueryHandler(IGoogleClient googleClient)
      {
        _googleClient = googleClient;
      }

      public async Task<IEnumerable<User>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
      {
        string token = null;
        var users = new List<User>();

        do
        {
          var result = await _googleClient.AnonymousAsync("it-minds.dk", token, cancellationToken);
          users.AddRange(result.Result.Users);
          token = result.Result.NextPageToken;
        } while (token != null);

        return users;
      }
    }
  }
}
