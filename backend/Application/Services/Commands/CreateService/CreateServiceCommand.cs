using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;

namespace Application.Services.Commands.CreateService
{
  [Authorize] 
  public class CreateServiceCommand : IRequest<int>
  {
    public ServiceDto Service { get; set; }

    public class CreateServiceCommandHandler : IRequestHandler<CreateServiceCommand, int>
    {
      private readonly IApplicationDbContext _context;

      private readonly ICurrentUserService _currentUserService;


      public CreateServiceCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
      {
        _context = context;
        _currentUserService = currentUserService;

      }

      public async Task<int> Handle(CreateServiceCommand request, CancellationToken cancellationToken)
      {
        var service = new Service()
        {
          Title = request.Service.Title,
          Description = request.Service.Description,
          State = request.Service.State
        };

        _context.Services.Add(service);

        await _context.SaveChangesAsync(cancellationToken);

        var serviceOwner = new ServiceOwner()
        {
          ServiceId = service.Id,
          Email = _currentUserService.UserEmail
        };
        _context.ServiceOwners.Add((serviceOwner));
        await _context.SaveChangesAsync(cancellationToken);

        return service.Id;
      }

    }
  }
}
