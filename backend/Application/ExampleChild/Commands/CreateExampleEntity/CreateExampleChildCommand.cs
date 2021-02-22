using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ExampleChildren.Commands.CreateExampleChild
{
  public class CreateExampleChildCommand : IRequest<int>
  {
    public ExampleChildDto Child;

    public class CreateExampleChildCommandHandler : IRequestHandler<CreateExampleChildCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateExampleChildCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateExampleChildCommand request, CancellationToken cancellationToken)
      {
        var exampleEntity = new ExampleChild
        {
          Name = request.Child.Name,
          Type = request.Child.Type,
          ParentId = request.Child.ParentId,
        };

        _context.ExampleChildren.Add(exampleEntity);

        await _context.SaveChangesAsync(cancellationToken);

        return exampleEntity.Id;
      }
    }
  }
}
