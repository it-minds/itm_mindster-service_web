using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.ApplicationOwners;
using Application.ApplicationOwners.Commands.CreateApplicationOwners;
using Application.Applications;
using Application.Applications.Commands.CreateApplication;
using Application.Common.Exceptions;
using Domain.Entities;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.ApplicationOwners.Commands.CreateApplicationOwners
{
  public class CreateApplicationOwnerCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistApplicationOwner()
    {
      var command = new CreateApplicationOwnerCommand
      {
        Id = 1,
        AppOwners = new List<ApplicationOwnerDto>{
          new ApplicationOwnerDto
          {
            Email = "mail1@mail.dk"
          },
          new ApplicationOwnerDto
          {
            Email = "mail2@mail.dk"
          }
        }
      };

      var handler = new CreateApplicationOwnerCommand.CreateApplicationOwnerCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);
      var entities = Context.AppOwners.Where(e => e.ApplicationId == command.Id).ToList();

      entities.Should().NotBeNullOrEmpty();
      result.Should().Be(2);
      entities[3].Email.Should().Be(command.AppOwners.ToList()[0].Email);
    }
    [Fact]
    public async Task Handle_GivenAlreadyExistingUser_ShouldAddNothing()
    {
      var command = new CreateApplicationOwnerCommand()
      {
        Id = 1,
        AppOwners = new List<ApplicationOwnerDto>
        {
          new ApplicationOwnerDto
          {
            Email = "test@mail.dk"
          },
          new ApplicationOwnerDto
          {
            Email = "iAlsoOwnApp1@mail.dk"
          }
        }
      };

      var handler =
        new CreateApplicationOwnerCommand.CreateApplicationOwnerCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);
      var entities = Context.ActionApprovers.Where(e => e.ActionId == command.Id).ToList();

      entities.Should().NotBeNullOrEmpty();
      result.Should().Be(0);
      entities.Count.Should().Be(2); // The 2 users already exists so the db should already have them and now add them again
    }
    [Fact]
    public void Handle_GivenInValidId_ThrowsException()
    {
      var command = new CreateApplicationOwnerCommand
      {
        Id = 99,
        AppOwners = new List<ApplicationOwnerDto>{
          new ApplicationOwnerDto
          {
            Email = "mail1@mail.dk"
          },
          new ApplicationOwnerDto
          {
            Email = "mail2@mail.dk"
          }
        }
      };

      var handler = new CreateApplicationOwnerCommand.CreateApplicationOwnerCommandHandler(Context, CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
    [Fact]
    public void Handle_InvalidUser_ShouldThrowError()
    {
      var command = new CreateApplicationOwnerCommand
      {
        Id = 1,
        AppOwners = new List<ApplicationOwnerDto>{
          new ApplicationOwnerDto
          {
            Email = "mail1@mail.dk"
          },
          new ApplicationOwnerDto
          {
            Email = "mail2@mail.dk"
          }
        }
      };
      var handler = new CreateApplicationOwnerCommand.CreateApplicationOwnerCommandHandler(Context, InvalidUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<ForbiddenAccessException>();
    }
  }
}
