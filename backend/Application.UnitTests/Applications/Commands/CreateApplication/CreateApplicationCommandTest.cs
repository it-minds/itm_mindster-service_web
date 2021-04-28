using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Applications;
using Application.Applications.Commands.CreateApplication;
using Application.Applications.Commands.UpdateApplication;
using Application.Common.Exceptions;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.Applications.Commands.CreateApplication
{
  public class CreateApplicationCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistApplication()
    {
      var command = new CreateApplicationCommand()
      {
        Application = new ApplicationDto
        {
          Title = "Test application",
          Description = "Desc for test app",
          AppIdentifier = "test_application"
        }
      };
      var handler = new CreateApplicationCommand.CreateApplicationCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);

      result.Should().NotBe(null);

      var entity = Context.Applications.Find(result);
      entity.Should().NotBeNull();
      entity.Title.Should().Be(command.Application.Title);
      entity.Description.Should().Be(command.Application.Description);
      entity.AppIdentifier.Should().Be(command.Application.AppIdentifier);
    }
    [Fact]
    public void Handle_DuplicateIdentifier_ShouldThrowError()
    {
      var command = new CreateApplicationCommand()
      {
        Application = new ApplicationDto
        {
          Title = "Test application",
          Description = "Desc for test app",
          AppIdentifier = "app_one" //This identifier already exists in the DbContextFactory
        }
      };
      var handler = new CreateApplicationCommand.CreateApplicationCommandHandler(Context, CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<DuplicateIdentifierException>();
    }
  }
}
