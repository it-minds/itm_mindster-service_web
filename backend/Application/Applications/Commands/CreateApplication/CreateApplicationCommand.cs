using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AuthService.Client;
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

      private readonly IAuthClient _authClient;

      public CreateApplicationCommandHandler(IApplicationDbContext context, IAuthClient authClient)
      {
        _context = context;
        _authClient = authClient;
        authClient.BaseUrl = ""; // TODO use options to get this URL.
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

        var result = await _authClient.AppAsync(new Test {
          AppIdentifer = application.Title
        }, cancellationToken);
        // result.AppSecret; // TODO return AppSecret. Can never be retrieved again from external service

        return application.Id;
      }
    }
  }
}
