using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.ApplicationOwners;
using Application.ApplicationOwners.Commands.CreateApplicationOwners;
using Application.ServiceOwners.Commands.CreateServiceOwners;
using Application.Common.Exceptions;
using Application.ServiceOwners;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.ServiceOwners.Commands.CreateServiceOwnersCommand
{
  public class CreateServiceOwnersCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistServiceOwners()
    {
      var command = new CreateServiceOwnerCommand
      {
        Id = 1,
        ServiceOwners = new List<ServiceOwnerDto>{
          new ServiceOwnerDto
          {
            Email = "mail1@mail.dk"
          },
          new ServiceOwnerDto
          {
            Email = "mail2@mail.dk"
          }
        }
      };

      var handler = new CreateServiceOwnerCommand.CreateServiceOwnersCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);
      var entities = Context.ServiceOwners.Where(e => e.ServiceId == command.Id).ToList();

      entities.Should().NotBeNullOrEmpty();
      result.Should().Be(2);
      entities[3].Email.Should().Be(command.ServiceOwners.ToList()[0].Email);
    }

    [Fact]
    public async Task Handle_GivenAlreadyExistingUser_ShouldAddNothing()
    {
      var command = new CreateServiceOwnerCommand()
      {
        Id = 1,
        ServiceOwners = new List<ServiceOwnerDto>
        {
          new ServiceOwnerDto
          {
            Email = "test@mail.dk"
          },
          new ServiceOwnerDto
          {
            Email = "iAlsoOwnService1@mail.dk"
          }
        }
      };

      var handler =
        new CreateServiceOwnerCommand.CreateServiceOwnersCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);
      var entities = Context.ActionApprovers.Where(e => e.ActionId == command.Id).ToList();

      entities.Should().NotBeNullOrEmpty();
      result.Should().Be(0);
      entities.Count.Should().Be(2); // The 2 users already exists so the db should already have them and now add them again
    }
    [Fact]
    public void Handle_GivenInValidId_ThrowsException()
    {
      var command = new CreateServiceOwnerCommand
      {
        Id = 99,
        ServiceOwners = new List<ServiceOwnerDto>{
          new ServiceOwnerDto
          {
            Email = "mail1@mail.dk"
          },
          new ServiceOwnerDto
          {
            Email = "mail2@mail.dk"
          }
        }
      };

      var handler = new CreateServiceOwnerCommand.CreateServiceOwnersCommandHandler(Context, CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
    [Fact]
    public void Handle_InvalidUser_ShouldThrowError()
    {
      var command = new CreateServiceOwnerCommand
      {
        Id = 99,
        ServiceOwners = new List<ServiceOwnerDto>{
          new ServiceOwnerDto
          {
            Email = "mail1@mail.dk"
          },
          new ServiceOwnerDto
          {
            Email = "mail2@mail.dk"
          }
        }
      };
      var handler = new CreateServiceOwnerCommand.CreateServiceOwnersCommandHandler(Context, InvalidUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
  }
}
