using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTokenActions;
using Application.AppTokens;
using Application.AppTokens.Commands.UpdateAppTokenActions;
using Application.Common.Exceptions;
using Domain.Enums;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.AppTokens.Commands.UpdateAppTokenActions
{
  public class UpdateAppTokenActionsCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_GivenValidTokenId_AmountOfActions_ShouldUpdatePersistedAppToken()
    {
      var command = new UpdateAppTokenStateCommand
      {
        Id = 1,
        NewState = TokenStates.JwtReceived
      };
      var handler = new UpdateAppTokenStateCommand.UpdateAppTokenStateCommandHandler(Context, CurrentUserServiceMock.Object);

      await handler.Handle(command, CancellationToken.None);

      var entity = Context.AppTokens.Find(command.Id);

      entity.Should().NotBeNull();
      entity.State.Should().Be(command.NewState);
    }
    [Fact]
    public void Handle_InvalidUser_ShouldThrowError()
    {
      var command = new UpdateAppTokenStateCommand
      {
        Id = 1,
        NewState = TokenStates.JwtReceived
      };
      var handler = new UpdateAppTokenStateCommand.UpdateAppTokenStateCommandHandler(Context, InvalidUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
  }
}
