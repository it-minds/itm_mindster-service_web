using System.Threading;
using System.Threading.Tasks;
using Application.Applications;
using Application.Applications.Commands.CreateApplication;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.Applications.Commands.CreateApplication
{
  public class CreateApplicationCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistApplication()
    {
      var command = new CreateApplicationCommand()
      {
        Application = new ApplicationDto
        {
          Title = "Test application",
          Description = "Desc for test app"
        }
      };
      var handler = new CreateApplicationCommand.CreateApplicationCommandHandler(Context, AuthCient, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);
      result.appId.Should().NotBe(null);
      result.AppSecret.Should().NotBeNullOrEmpty();
      var entity = Context.Applications.Find(result.appId);
      entity.Should().NotBeNull();
      entity.Title.Should().Be(command.Application.Title);
      entity.Description.Should().Be(command.Application.Description);
    }
  }
}
