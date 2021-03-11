using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Applications.Commands.CreateApplication
{
  public class CreateApplicationCommand : IRequest<int>
  {
    public ApplicationDto Application { get; set; }

    public class CreateApplicationCommandHandler : IRequestHandler<CreateApplicationCommand, int>
    {
      private readonly IApplicationDbContext _context;

      public CreateApplicationCommandHandler(IApplicationDbContext context)
      {
        _context = context;
      }

      public async Task<int> Handle(CreateApplicationCommand request, CancellationToken cancellationToken)
      {
        var application = new ApplicationEntity()
        {
          Title = request.Application.Title,
          Description = request.Application.Description
        };

        _context.Applications.Add(application);

        await _context.SaveChangesAsync(cancellationToken);

        return application.Id;
      }
    }
  }
}
