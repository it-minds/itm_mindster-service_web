using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Security;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.Applications.Commands.UpdateApplication
{
  [Authorize]
  public class UpdateApplicationCommand : IRequest
  {
    [JsonIgnore]
    public int Id { get; set; }
    public ApplicationDto Application { get; set; }

    public class UpdateApplicationCommandHandler : IRequestHandler<UpdateApplicationCommand>
    {
      private readonly IApplicationDbContext _context;
      private readonly ICurrentUserService _currentUserService;

      public UpdateApplicationCommandHandler(IApplicationDbContext context, ICurrentUserService currentUserService)
      {
        _context = context;
        _currentUserService = currentUserService;
      }

      public async Task<Unit> Handle(UpdateApplicationCommand request, CancellationToken cancellationToken)
      {

        var application = await _context.Applications.FindAsync(request.Id);

        if (application == null) throw new NotFoundException(nameof(ApplicationEntity), request.Id);

        if (!await _context.AppOwners.AnyAsync(e => e.ApplicationId == request.Id && e.Email == _currentUserService.UserEmail, cancellationToken))
        {
          throw new ForbiddenAccessException(nameof(ApplicationEntity), request.Id);

        }

        application.Title = request.Application.Title;
        application.Description = request.Application.Description;

        _context.Applications.Update(application);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
      }
    }
  }
}
