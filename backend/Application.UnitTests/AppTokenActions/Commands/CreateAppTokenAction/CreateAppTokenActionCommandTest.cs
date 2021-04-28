using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Actions;
using Application.Actions.Commands.CreateAction;
using Application.AppTokenActions;
using Application.AppTokenActions.Commands.CreateAppTokenAction;
using Application.AppTokens;
using Application.Common.Exceptions;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.AppTokenActions.Commands.CreateAppTokenAction
{
  public class CreateAppTokenActionCommandTest : CommandTestBase
  {
    [Fact]
    public async Task WithValidAppTokenAndNoDuplicateActions_ShouldPersistAction()
    {
      var command = new CreateAppTokenActionsCommand
      {
        TokenId = 1,
        AppToken = new AppTokenDto()
        {
          AppTokenActions = new List<AppTokenActionDto>
          {
            new AppTokenActionDto{ActionId = 3},
            new AppTokenActionDto{ActionId = 4}
          }
        }
      };
      var handler = new CreateAppTokenActionsCommand.CreateAppTokenActionsCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.AppTokens.Find(1);

      result.Should().Be(2);
      entity.Should().NotBeNull();
      entity.Id.Should().Be(command.TokenId);
      entity.AppTokenActions.Count.Should().Be(3 + result);
      entity.AppTokenActions.ToList().Last().ActionId.Should().Be(command.AppToken.AppTokenActions.Last().ActionId);
    }
    [Fact]
    public void WithInValidTokenId_ThrowsException()
    {
      var command = new CreateAppTokenActionsCommand
      {
        TokenId = 99,
        AppToken = new AppTokenDto()
        {
          AppTokenActions = new List<AppTokenActionDto>
          {
            new AppTokenActionDto{ActionId = 3},
            new AppTokenActionDto{ActionId = 4}
          }
        }
      };
      var handler = new CreateAppTokenActionsCommand.CreateAppTokenActionsCommandHandler(Context, CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
    [Fact]
    public async Task WithValidAppTokenButOnlyDuplicates_ShouldPersistAction()
    {
      var command = new CreateAppTokenActionsCommand
      {
        TokenId = 1,
        AppToken = new AppTokenDto()
        {
          AppTokenActions = new List<AppTokenActionDto>
          {
            new AppTokenActionDto{ActionId = 1},
            new AppTokenActionDto{ActionId = 2}
          }
        }
      };
      var handler = new CreateAppTokenActionsCommand.CreateAppTokenActionsCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.AppTokens.Find(1);

      result.Should().Be(0);
      entity.Should().NotBeNull();
      entity.Id.Should().Be(command.TokenId);
      entity.AppTokenActions.Count.Should().Be(3);
    }
    [Fact]
    public void Handle_InvalidUser_ShouldThrowError()
    {
      var command = new CreateAppTokenActionsCommand
      {
        TokenId = 1,
        AppToken = new AppTokenDto()
        {
          AppTokenActions = new List<AppTokenActionDto>
          {
            new AppTokenActionDto{ActionId = 3},
            new AppTokenActionDto{ActionId = 4}
          }
        }
      };
      var handler = new CreateAppTokenActionsCommand.CreateAppTokenActionsCommandHandler(Context, InvalidUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<ForbiddenAccessException>();
    }

  }
}
