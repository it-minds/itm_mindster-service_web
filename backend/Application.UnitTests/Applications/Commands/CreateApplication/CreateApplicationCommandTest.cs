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
      var handler = new CreateApplicationCommand.CreateApplicationCommandHandler(Context, AuthCient);

      var result = await handler.Handle(command, CancellationToken.None);
      //TODO change the hardcoded Find(4) to the proper result.Id when we synchronise aid later
      var entity = Context.Applications.Find(4);

      entity.Should().NotBeNull();
      entity.Title.Should().Be(command.Application.Title);
      entity.Description.Should().Be(command.Application.Description);
    }
  }
}
