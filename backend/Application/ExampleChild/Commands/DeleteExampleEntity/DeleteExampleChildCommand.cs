using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ExampleChildren.Commands.DeleteExampleChild
{
  public class DeleteExampleChildCommand : IRequest
  {
    public int Id { get; set; }

    public class DeleteExampleChildCommandHandler : IRequestHandler<DeleteExampleChildCommand>
    {
      private readonly IApplicationDbContext _context;

      public DeleteExampleChildCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }
      public async Task<Unit> Handle(DeleteExampleChildCommand request, CancellationToken cancellationToken)
      {
        var exampleEntity = await _context.ExampleChildren.FindAsync(request.Id);

        if (exampleEntity == null)
        {
          throw new NotFoundException(nameof(ExampleChild), request.Id);
        }

        _context.ExampleChildren.Remove(exampleEntity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
