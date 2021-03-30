using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTokenActions;
using Application.AppTokens;
using Application.AppTokens.Commands.UpdateAppTokenActions;
using Application.Common.Exceptions;
using AutoMapper;
using Domain.Enums;
using FluentAssertions;
using Infrastructure.Persistence;
using Xunit;

namespace Application.UnitTests.AppTokens.Commands.UpdateAppTokenActions
{
  public class UpdateAppTokenActionsCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_GivenValidTokenId_AmountOfActions_ShouldUpdatePersistedAppToken()
    {
      var command = new UpdateAppTokenCommand
      {
        Id = 1,
        AppToken = new AppTokenUpdateDto
        {
          AppTokenActions = new List<AppTokenActionUpdateDto> {
            new AppTokenActionUpdateDto
            {
              State = ServiceStates.Approved,
              RejectionReason = ""
            },
            new AppTokenActionUpdateDto
            {
              State = ServiceStates.Rejected,
              RejectionReason = "Test rejected"
            }
          }
        }
      };
      var handler = new UpdateAppTokenCommand.UpdateAppTokenCommandHandler(Context);

      await handler.Handle(command, CancellationToken.None);

      var entity = Context.AppTokens.Find(command.Id);

      entity.Should().NotBeNull();
      entity.AppTokenActions.First().RejectionReason.Should().Be("");
      entity.AppTokenActions.First().State.Should().Be(ServiceStates.Approved);
      entity.AppTokenActions.Last().RejectionReason.Should().Be("Test rejected");
      entity.AppTokenActions.Last().State.Should().Be(ServiceStates.Rejected);
    }
    [Fact]
    public void Handle_GivenInValidTokenId_ThrowsException()
    {
      var command = new UpdateAppTokenCommand
      {
        Id = 99,
        AppToken = new AppTokenUpdateDto
        {
          AppTokenActions = new List<AppTokenActionUpdateDto> {
            new AppTokenActionUpdateDto
            {
              State = ServiceStates.Approved,
              RejectionReason = ""
            },
            new AppTokenActionUpdateDto
            {
              State = ServiceStates.Rejected,
              RejectionReason = "Test rejected"
            }
          }
        }
      };
      var handler = new UpdateAppTokenCommand.UpdateAppTokenCommandHandler(Context);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
    [Fact]
    public void Handle_GivenInvalidAmountOfActions_ThrowsException()
    {
      var command = new UpdateAppTokenCommand
      {
        Id = 1,
        AppToken = new AppTokenUpdateDto
        {
          AppTokenActions = new List<AppTokenActionUpdateDto> {
            new AppTokenActionUpdateDto
            {
              State = ServiceStates.Approved,
              RejectionReason = ""
            }
          }
        }
      };
      var handler = new UpdateAppTokenCommand.UpdateAppTokenCommandHandler(Context);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
  }
}
