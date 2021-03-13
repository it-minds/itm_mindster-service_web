using System.Threading;
using System.Threading.Tasks;
using Application.Applications;
using Application.Applications.Commands.CreateApplication;
using Application.Services;
using Application.Services.Commands.CreateService;
using AuthService.Interfaces;
using Domain.Enums;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.Applications.Commands.CreateApplication
{
  public class CreateApplicationCommandTest : CommandTestBase
  {
    private readonly IAuthClient _authCient;

    public CreateApplicationCommandTest() {
      _authCient = new AuthTestService();
    }

    [Fact]
    public async Task Hande_ShouldPersistApplication()
    {
      var command = new CreateApplicationCommand()
      {
        Application = new ApplicationDto
        {
          Title = "Test application",
          Description = "Desc for test app"
        }
      };
      var handler = new CreateApplicationCommand.CreateApplicationCommandHandler(Context, _authCient);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.Applications.Find(result);

      entity.Should().NotBeNull();
      entity.Title.Should().Be(command.Application.Title);
      entity.Description.Should().Be(command.Application.Description);
    }
  }
}
