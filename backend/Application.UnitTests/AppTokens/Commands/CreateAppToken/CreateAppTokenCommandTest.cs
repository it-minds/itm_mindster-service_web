using System;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTokens;
using Application.AppTokens.Commands;
using Application.AppTokens.Commands.CreateAppToken;
using Application.Common.Exceptions;
using Domain.Enums;
using FluentAssertions;
using Xunit;

namespace Application.UnitTests.AppTokens.Commands.CreateAppToken
{
  public class CreateAppTokenCommandTest : CommandTestBase
  {
    [Fact]
    public async Task WithValidApplicationId_ShouldPersistAppToken()
    {
      var command = new CreateAppTokenCommand
      {
        Id = 1,
        AppToken = new AppTokenCreateDto
        {
          Description = "Test af CreateAppToken",
          TokenIdentifier = "den_anden_app_token" //This identifier exists but not in application 1 so it should still be created
        }
      };

      var handler = new CreateAppTokenCommand.CreateAppTokenCommandHandler(Context, CurrentUserServiceMock.Object);

      var result = await handler.Handle(command, CancellationToken.None);

      result.Should().NotBe(null);

      var entity = Context.AppTokens.Find(result);
      entity.Should().NotBeNull();
      entity.Description.Should().Be(command.AppToken.Description);
      entity.TokenIdentifier.Should().Be(command.AppToken.TokenIdentifier);
      entity.ApplicationId.Should().Be(command.Id);
      entity.State.Should().Be(TokenStates.Created);
    }
    [Fact]
    public void WithInvalidApplicationId_ThrowsException()
    {
      var command = new CreateAppTokenCommand
      {
        Id = 99,
        AppToken = new AppTokenCreateDto
        {
          Description = "Test af CreateAppToken",
          TokenIdentifier = "test_af_create_app_token",
        }
      };

      var handler = new CreateAppTokenCommand.CreateAppTokenCommandHandler(Context, CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
    [Fact]
    public void Handle_InvalidUser_ShouldThrowError()
    {
      var command = new CreateAppTokenCommand
      {
        Id = 1,
        AppToken = new AppTokenCreateDto
        {
          Description = "Test af CreateAppToken",
          TokenIdentifier = "test_af_create_app_token",
        }
      };
      var handler = new CreateAppTokenCommand.CreateAppTokenCommandHandler(Context, InvalidUserServiceMock.Object);

      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<ForbiddenAccessException>();
    }
    [Fact]
    public void Handle_DuplicateIdentifier_ShouldThrowError()
    {
      var command = new CreateAppTokenCommand
      {
        Id = 1,
        AppToken = new AppTokenCreateDto
        {
          Description = "Test af CreateAppToken",
          TokenIdentifier = "den_første_app_token" // This identifier already exists in application 1
        }
      };

      var handler = new CreateAppTokenCommand.CreateAppTokenCommandHandler(Context, CurrentUserServiceMock.Object);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<DuplicateIdentifierException>();
    }
  }
}
