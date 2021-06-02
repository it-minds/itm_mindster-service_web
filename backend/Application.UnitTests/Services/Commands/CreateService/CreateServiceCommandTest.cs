using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
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
          ServiceIdentifier = "approved_service"
        }
      };
      var handler = new CreateServiceCommand.CreateServiceCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.Services.Find(result);

      entity.Should().NotBeNull();
      entity.Title.Should().Be(command.Service.Title);
      entity.Description.Should().Be(command.Service.Description);
    }
    [Fact]
    public void Handle_DuplicateIdentifier_ShouldThrowError()
    {
      var command = new CreateServiceCommand()
      {
        Service = new ServiceDto
        {
          Title = "Approved Service",
          Description = "Test of CreateService",
          ServiceIdentifier = "first" // This already exists in Db
        }
      };
      var handler = new CreateServiceCommand.CreateServiceCommandHandler(Context, CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<DuplicateIdentifierException>();
    }
  }
}
