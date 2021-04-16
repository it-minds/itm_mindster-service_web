using FluentValidation;

namespace Application.AppTokenActions.Commands.UpdateAppTokenActions
{
  public class UpdateAppTokenActionsCommandValidator : AbstractValidator<UpdateAppTokenActionsCommand>
  {
    public UpdateAppTokenActionsCommandValidator()
    {
      RuleFor(e => e.Id)
        .NotEmpty();
      RuleFor(e => e.AppToken)
        .NotNull();
      RuleFor(e => e.AppToken.AppTokenActions)
        .NotNull();
    }
  }
}
