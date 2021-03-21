using Application.Services.Commands.CreateService;
using FluentValidation;

namespace Application.AppTokens.Commands
{
  public class CreateAppTokenCommandValidation : AbstractValidator<CreateAppTokenCommand>
  {
    public CreateAppTokenCommandValidation()
    {
      RuleFor(e => e.Id)
        .NotEmpty();
    }
  }
}
