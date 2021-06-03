using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Applications;
using Application.Applications.Commands.CreateApplication;
using Application.Applications.Commands.CreateAppSecret;
using Application.Common.Exceptions;
using AuthService.Client;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.Applications.Commands.CreateAppSecret
{
  public class CreateAppSecretCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_CorrectUserAndAppId_ReturnsApplicationResult()
    {
      var command = new CreateAppSecretCommand()
      {
        AppId = 1
      };
      var handler = new CreateAppSecretCommand.CreateAppSecretCommandHandler(Context, AuthCient, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);

      result.Should().BeOfType(typeof(ApplicationOutput));
      result.Should().NotBeNull();
      result.AppIdentifer.Should().NotBeNullOrEmpty();
      result.AppSecret.Should().NotBeNullOrEmpty();

      var entity = Context.Applications.Find(command.AppId);
      entity.AppSecretGenerated.Should().BeTrue(); // The command should update the boolean of the AppEntity so the secret can't be fetched again
    }
    [Fact]
    public void Handle_InvalidAppId_ShouldThrowError()
    {
      var command = new CreateAppSecretCommand()
      {
        AppId = 99
      };
      var handler = new CreateAppSecretCommand.CreateAppSecretCommandHandler(Context, AuthCient, CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
    [Fact]
    public void Handle_AppSecretAlreadyGenerated_ShouldThrowError()
    {
      var command = new CreateAppSecretCommand()
      {
        AppId = 2 //Application 2 already generated AppSecret once
      };
      var handler = new CreateAppSecretCommand.CreateAppSecretCommandHandler(Context, AuthCient, CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<ForbiddenAccessException>().WithMessage("AppSecret has already been retrieved once, and can't be retrieved again");
    }
    [Fact]
    public void Handle_InvalidUser_ShouldThrowError()
    {
      var command = new CreateAppSecretCommand()
      {
        AppId = 1
      };
      var handler = new CreateAppSecretCommand.CreateAppSecretCommandHandler(Context, AuthCient, InvalidUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<ForbiddenAccessException>();
    }
  }
}
