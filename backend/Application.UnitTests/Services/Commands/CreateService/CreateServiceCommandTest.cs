using System.Threading;
using System.Threading.Tasks;
using Application.Services;
using Application.Services.Commands.CreateService;
using Domain.Enums;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.Services.Commands.CreateService
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
        }
      };
      var handler = new CreateServiceCommand.CreateServiceCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.Services.Find(result);

      entity.Should().NotBeNull();
      entity.Title.Should().Be(command.Service.Title);
      entity.Description.Should().Be(command.Service.Description);
    }
  }
}
