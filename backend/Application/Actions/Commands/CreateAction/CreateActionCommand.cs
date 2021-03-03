using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Actions.Commands.CreateAction
{
  public class CreateActionCommand : IRequest<int>
  {
    [JsonIgnore]
    public int Id { get; set; }
    public ActionDto Action;

    public class CreateActionCommandHandler : IRequestHandler<CreateActionCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateActionCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateActionCommand request, CancellationToken cancellationToken)
      {
        var action = new Action
        {
          Title = request.Action.Title,
          Description = request.Action.Description,
          AdminNote = request.Action.AdminNote,
          ServiceId = request.Id
        };

        _context.Actions.Add(action);

        await _context.SaveChangesAsync(cancellationToken);

        return action.Id;
      }
    }
  }
}
