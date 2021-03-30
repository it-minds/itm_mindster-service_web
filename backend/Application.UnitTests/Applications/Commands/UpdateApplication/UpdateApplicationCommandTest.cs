using Application.Common.Exceptions;
using Application.ExampleChildren;
using Application.ExampleChildren.Commands.UpdateExampleChild;
using Domain.Enums;
using FluentAssertions;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Applications;
using Application.Applications.Commands.UpdateApplication;
using Xunit;

namespace Application.UnitTests.Applications.Commands.UpdateApplication
{
  public class UpdateApplicationCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_GivenValidId_ShouldUpdatePersistedApplication()
    {
      var command = new UpdateApplicationCommand
      {
        Id = 1,
        Application = new ApplicationDto
        {
          Title = "Im updated",
          Description = "Updated description"
        }
      };

      var handler = new UpdateApplicationCommand.UpdateApplicationCommandHandler(Context, CurrentUserServiceMock.Object);

      await handler.Handle(command, CancellationToken.None);

      var entity = Context.Applications.Find(command.Id);

      entity.Should().NotBeNull();
      entity.Title.Should().Be(command.Application.Title);
      entity.Description.Should().Be(command.Application.Description);
    }
    [Fact]
    public void Handle_GivenInValidId_ThrowsException()
    {
      var command = new UpdateApplicationCommand
      {
        Id = 99,
        Application = new ApplicationDto
        {
          Title = "Im updated",
          Description = "Updated description"
        }
      };

      var handler = new UpdateApplicationCommand.UpdateApplicationCommandHandler(Context, CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
    [Fact]
    public void Handle_InvalidUser_ShouldThrowError()
    {
      var command = new UpdateApplicationCommand
      {
        Id = 1,
        Application = new ApplicationDto
        {
          Title = "Im updated",
          Description = "Updated description"
        }
      };
      var handler = new UpdateApplicationCommand.UpdateApplicationCommandHandler(Context, InvalidUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
  }
}

