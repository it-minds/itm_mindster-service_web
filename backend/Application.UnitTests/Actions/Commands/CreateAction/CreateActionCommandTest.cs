using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Actions;
using Application.Actions.Commands.CreateAction;
using Application.Common.Exceptions;
using Application.Services;
using Application.Services.Commands.CreateService;
using Domain.Enums;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.Actions.Commands.CreateAction
{
  public class CreateActionCommandTest : CommandTestBase
  {
    [Fact]
    public async Task WithValidServiceId_ShouldPersistAction()
    {
      var command = new CreateActionCommand()
      {
        Id = 1,
        Action = new ActionDto()
        {
          Title = "Test of createAction",
          ActionIdentifier = "title_for_three", // this one already exists, but not in Service 1
          Description = "Added to service 1",
          AdminNote = "TEST ACTION"
        }
      };
      var handler = new CreateActionCommand.CreateActionCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.Actions.Find(result);

      entity.Should().NotBeNull();
      entity.Title.Should().Be(command.Action.Title);
      entity.Description.Should().Be(command.Action.Description);
      entity.AdminNote.Should().Be(command.Action.AdminNote);
      entity.ServiceId.Should().Be(command.Id);
      entity.ActionIdentifier.Should().Be(command.Action.ActionIdentifier);
    }
    [Fact]
    public void WithInValidServiceId_ThrowsException()
    {
      var command = new CreateActionCommand()
      {
        Id = 99,
        Action = new ActionDto()
        {
          Title = "Test of createAction",
          ActionIdentifier = "test_of_create_Action",
          Description = "Added to service 1",
          AdminNote = "TEST ACTION"
        }
      };
      var handler = new CreateActionCommand.CreateActionCommandHandler(Context,  CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
    [Fact]
    public void Handle_InvalidUser_ShouldThrowError()
    {
      var command = new CreateActionCommand()
      {
        Id = 1,
        Action = new ActionDto()
        {
          Title = "Test of createAction",
          ActionIdentifier = "test_of_create_Action",
          Description = "Added to service 1",
          AdminNote = "TEST ACTION"
        }
      };
      var handler = new CreateActionCommand.CreateActionCommandHandler(Context, InvalidUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<ForbiddenAccessException>();
    }
    [Fact]
    public void Handle_DuplicateIdentifier_ShouldThrowError()
    {
      var command = new CreateActionCommand()
      {
        Id = 1,
        Action = new ActionDto()
        {
          Title = "Test of createAction",
          ActionIdentifier = "title_for_two",
          Description = "Added to service 1",
          AdminNote = "TEST ACTION"
        }
      };
      var handler = new CreateActionCommand.CreateActionCommandHandler(Context, CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<DuplicateIdentifierException>();
    }
  }
}
