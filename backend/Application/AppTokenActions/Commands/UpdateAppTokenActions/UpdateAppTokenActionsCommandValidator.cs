using FluentValidation;

namespace Application.AppTokenActions.Commands.UpdateAppTokenActions
{
  public class UpdateAppTokenActionsCommandValidator : AbstractValidator<UpdateAppTokenActionsCommand>
  {
    public UpdateAppTokenActionsCommandValidator()
    {
      RuleFor(e => e.TokenId)
        .NotEmpty();
      RuleFor(e => e.AppToken)
        .NotNull();
      RuleFor(e => e.AppToken.AppTokenActions)
        .NotNull();
    }
  }
}
