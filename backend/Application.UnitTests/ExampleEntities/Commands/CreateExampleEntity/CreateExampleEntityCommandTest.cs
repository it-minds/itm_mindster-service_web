using Application.ExampleChildren;
using Application.ExampleChildren.Commands.CreateExampleChild;
using Domain.Enums;
using FluentAssertions;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Application.UnitTests.ExampleChildren.Commands.CreateExampleChild
{
  public class CreateExampleChildCommandTest : CommandTestBase
  {
    [Fact]
    public async Task Handle_ShouldPersistExampleChild()
    {
      var command = new CreateExampleChildCommand
      {
        Child = new ExampleChildDto
        {

          Name = "Young Test",
          Type = ExampleEnum.Youngest,
          ParentId = 1
    }
      };

      var handler = new CreateExampleChildCommand.CreateExampleChildCommandHandler(Context);

      var result = await handler.Handle(command, CancellationToken.None);

      var entity = Context.ExampleChildren.Find(result);

      entity.Should().NotBeNull();
      entity.Name.Should().Be(command.Child.Name);
      entity.Type.Should().Be(command.Child.Type);
      entity.ParentId.Should().Be(command.Child.ParentId);
    }
  }
}
