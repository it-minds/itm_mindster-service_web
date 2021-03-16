using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AuthService.Client;
using Domain.Entities;
using MediatR;

namespace Application.Applications.Commands.CreateApplication
{
  public class CreateApplicationCommand : IRequest<string>
  {
    public ApplicationDto Application { get; set; }

    public class CreateApplicationCommandHandler : IRequestHandler<CreateApplicationCommand, string>
    {
      private readonly IApplicationDbContext _context;

      private readonly IAuthClient _authClient;

      public CreateApplicationCommandHandler(IApplicationDbContext context, IAuthClient authClient)
      {
        _context = context;
        _authClient = authClient;
      }

      public async Task<string> Handle(CreateApplicationCommand request, CancellationToken cancellationToken)
      {
        var application = new ApplicationEntity()
        {
          Title = request.Application.Title,
          Description = request.Application.Description
        };

        _context.Applications.Add(application);

        await _context.SaveChangesAsync(cancellationToken);


        var result = await _authClient.AppAsync(new ApplicationInput {
          AppIdentifer = application.Title
        }, cancellationToken);
        // result.AppSecret; // TODO return AppSecret. Can never be retrieved again from external service
        var resultString = "Created App " + application.Id + "With AppSecret: " + result.AppSecret;
        return resultString;
      }
    }
  }
}
