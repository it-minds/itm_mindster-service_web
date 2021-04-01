using Application.Users.Queries;
using GoogleService.Client;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web.Controllers
{
  public class UserController : ApiControllerBase
  {
    [HttpGet]
    [ResponseCache(VaryByHeader = "User-Agent", Duration = 14400)]
    public async Task<IEnumerable<User>> GetAllUsers()
    {
      return await Mediator.Send(new GetUsersQuery {});
    }
  }
}
