using System;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTokens;
using Application.AppTokens.Commands;
using Application.Common.Exceptions;
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
        AppToken = new AppTokenCreateDto {Description = "Test af CreateAppToken"}
      };

      var handler = new CreateAppTokenCommand.CreateAppTokenCommandHandler(Context);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.AppTokens.Find(result);

      entity.Should().NotBeNull();
      entity.Description.Should().Be(command.AppToken.Description);
    }
    [Fact]
    public void WithInvalidApplicationId_ThrowsException()
    {
      var command = new CreateAppTokenCommand
      {
        Id = 99,
        AppToken = new AppTokenCreateDto { Description = "Test af CreateAppToken" }
      };

      var handler = new CreateAppTokenCommand.CreateAppTokenCommandHandler(Context);
      Func<Task> action = async () => await handler.Handle(command, CancellationToken.None);

      action.Should().Throw<NotFoundException>();
    }
  }
}
