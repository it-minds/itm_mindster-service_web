using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Newtonsoft.Json;

namespace Application.Actions.Commands.CreateAction
{
  public class CreateActionCommand : IRequest<int>
  {
    [JsonIgnore]
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string AdminNote { get; set; }


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
          Title = request.Title,
          Description = request.Description,
          AdminNote = request.AdminNote,
          ServiceId = request.Id
        };

        _context.Actions.Add(action);

        await _context.SaveChangesAsync(cancellationToken);

        return action.Id;
      }
    }
  }
}
