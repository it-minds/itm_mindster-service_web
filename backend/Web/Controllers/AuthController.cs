using Application.Auth.Commands;
using Google.Apis.Auth.AspNetCore3;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Web.Controllers
{
  public class AuthController : ApiControllerBase
  {
    public ActionResult<string> GetLoginUrl()
    {
      return Ok(Url.Action(nameof(GoogleLogin)));
    }

    [HttpGet("google")]
    public async Task GoogleLogin([FromQuery] string callback)
    {
      if (callback == "" || callback == null)
      {
        // return BadRequest("Missing callback url"); // TODO method has to be void to trigger Challenge???
      }

      var props = new AuthenticationProperties()
      {
        RedirectUri = "/api/auth/google-callback?callback=" + callback,
      };

      await HttpContext.ChallengeAsync(GoogleDefaults.AuthenticationScheme, props);
    }

    // DotNet injects a magical endpoint "/signin-google" that I can catch.

    [Authorize(AuthenticationSchemes = GoogleOpenIdConnectDefaults.AuthenticationScheme)]
    [HttpGet("google-callback")]
    public async Task<IActionResult> GoogleCallback([FromQuery] string callback)
    {
      System.Console.WriteLine(callback);

      var token = await Mediator.Send(new GenerateTokenCommand {});

      return Redirect(callback + token);
    }

    [HttpPut()]
    public ActionResult<string> CheckAuth()
    {
      var useremail = HttpContext.User.FindFirstValue(ClaimTypes.Email);
      return Ok(useremail);
    }
  }
}
