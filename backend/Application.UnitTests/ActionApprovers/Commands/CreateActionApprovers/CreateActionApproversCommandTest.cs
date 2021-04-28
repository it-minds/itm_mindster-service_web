using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.ActionApprovers;
using Application.ActionApprovers.Commands.CreateActionApprovers;
using Application.Common.Exceptions;
using Application.ServiceOwners;
using Application.ServiceOwners.Commands.CreateServiceOwners;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.ActionApprovers.Commands.CreateActionApprovers
{
  public class CreateActionApproversCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistActionApprovers()
    {
      var command = new CreateActionApproverCommand
      {
        Id = 1,
        ActionApprovers = new List<ActionApproverDto>{
          new ActionApproverDto
          {
            Email = "mail1@mail.dk"
          },
          new ActionApproverDto
          {
            Email = "mail2@mail.dk"
          }
        }
      };

      var handler = new CreateActionApproverCommand.CreateActionApproverCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);
      var entities = Context.ActionApprovers.Where(e => e.ActionId == command.Id).ToList();

      entities.Should().NotBeNullOrEmpty();
      result.Should().Be(2);
      entities[3].Email.Should().Be(command.ActionApprovers.ToList()[0].Email);
    }
    [Fact]
    public async Task Handle_GivenAlreadyExistingUser_ShouldAddNothing()
    {
      var command = new CreateActionApproverCommand
      {
        Id = 1,
        ActionApprovers = new List<ActionApproverDto>{
          new ActionApproverDto
          {
            Email = "test@mail.dk"
          },
          new ActionApproverDto
          {
            Email = "iAlsoOwnAction1@mail.dk"
          }
        }
      };

      var handler = new CreateActionApproverCommand.CreateActionApproverCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);
      var entities = Context.ActionApprovers.Where(e => e.ActionId == command.Id).ToList();

      entities.Should().NotBeNullOrEmpty();
      result.Should().Be(0);
      entities.Count.Should().Be(2); // The 2 users already exists so the db should already have them and now add them again
    }
    [Fact]
    public void Handle_GivenInValidId_ThrowsException()
    {
      var command = new CreateActionApproverCommand
      {
        Id = 99,
        ActionApprovers = new List<ActionApproverDto>{
          new ActionApproverDto
          {
            Email = "mail1@mail.dk"
          },
          new ActionApproverDto
          {
            Email = "mail2@mail.dk"
          }
        }
      };

      var handler = new CreateActionApproverCommand.CreateActionApproverCommandHandler(Context, CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
    [Fact]
    public void Handle_InvalidUser_ShouldThrowError()
    {
      var command = new CreateActionApproverCommand
      {
        Id = 1,
        ActionApprovers = new List<ActionApproverDto>{
          new ActionApproverDto
          {
            Email = "mail1@mail.dk"
          },
          new ActionApproverDto
          {
            Email = "mail2@mail.dk"
          }
        }
      };
      var handler = new CreateActionApproverCommand.CreateActionApproverCommandHandler(Context, InvalidUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<ForbiddenAccessException>();
    }
  }
}
