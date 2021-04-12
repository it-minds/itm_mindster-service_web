using Application.AppTokenActions.Commands.CreateAppTokenAction;
using Application.Services.Commands.CreateService;
using FluentValidation;

namespace Application.AppTokenActions.Commands
{
  public class CreateAppTokenActionsCommandValidation : AbstractValidator<CreateAppTokenActionsCommand>
  {
    public CreateAppTokenActionsCommandValidation()
    {
      RuleFor(e => e.TokenId)
        .NotEmpty();
      RuleFor(e => e.AppToken)
        .NotNull();

    }
  }
}
