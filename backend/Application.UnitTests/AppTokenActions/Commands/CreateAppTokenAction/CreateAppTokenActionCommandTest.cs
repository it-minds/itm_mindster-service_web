using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Actions;
using Application.Actions.Commands.CreateAction;
using Application.Common.Exceptions;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.AppTokenActions.Commands.CreateAppTokenAction
{
  public class CreateAppTokenActionCommandTest : CommandTestBase
  {
    [Fact]
    public async Task WithValidAppToken_ShouldPersistAction()
    {
      var command = new CreateActionCommand()
      {
        Id = 1,
        Action = new ActionDto()
        {
          Title = "Test of createAction",
          Description = "Added to service 1",
          AdminNote = "TEST ACTION"
        }
      };
      var handler = new CreateActionCommand.CreateActionCommandHandler(Context);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.Actions.Find(result);

      entity.Should().NotBeNull();
      entity.Title.Should().Be(command.Action.Title);
      entity.Description.Should().Be(command.Action.Description);
      entity.AdminNote.Should().Be(command.Action.AdminNote);
      entity.ServiceId.Should().Be(command.Id);
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
          Description = "Added to service 1",
          AdminNote = "TEST ACTION"
        }
      };
      var handler = new CreateActionCommand.CreateActionCommandHandler(Context);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }

  }
}
