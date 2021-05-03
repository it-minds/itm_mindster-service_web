using FluentValidation;

namespace Application.AppTokenActions.Commands.CreateAppTokenAction
{
  public class CreateAppTokenActionsCommandValidation : AbstractValidator<CreateAppTokenActionsCommand>
  {
    public CreateAppTokenActionsCommandValidation()
    {
      RuleFor(e => e.TokenId)
        .NotEmpty();
      RuleFor(e => e.Service)
        .NotNull();
    }
  }
}
