using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Services.Commands.CreateService
{
  public class CreateServiceCommand : IRequest<int>
  {
    public ServiceDto Service { get; set; }

    public class CreateServiceCommandHandler : IRequestHandler<CreateServiceCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateServiceCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateServiceCommand request, CancellationToken cancellationToken)
      {
        var service = new Domain.Entities.Service()
        {
          Title = request.Service.Title,
          Description = request.Service.Description,
          State = request.Service.State
        };

        _context.Services.Add(service);

        await _context.SaveChangesAsync(cancellationToken);

        return service.Id;
      }

    }
  }
}
