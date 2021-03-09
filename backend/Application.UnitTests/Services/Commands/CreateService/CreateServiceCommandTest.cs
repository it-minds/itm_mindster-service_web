using Domain.Enums;
using FluentAssertions;
using System.Threading;
using System.Threading.Tasks;
using Application.Services;
using Application.Services.Commands.CreateService;
using Xunit;

namespace Application.UnitTests.ExampleChildren.Commands.CreateExampleChild
{
  public class CreateServiceCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistService()
    {
      var command = new CreateServiceCommand()
      {
        Service = new ServiceDto
        {
          Title = "Approved Service",
          Description = "Test of CreateService",
          State = ServiceStates.Approved
        }
      };
      var handler = new CreateServiceCommand.CreateServiceCommandHandler(Context);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.Services.Find(result);

      entity.Should().NotBeNull();
      entity.Title.Should().Be(command.Service.Title);
      entity.Description.Should().Be(command.Service.Description);
      entity.State.Should().Be(command.Service.State);
    }
  }
}
