using Application.AppTokens.Commands.Update;
using FluentValidation;

namespace Application.AppTokens.Commands.UpdateAppTokenActions
{
  public class UpdateAppTokenCommandValidator : AbstractValidator<UpdateAppTokenCommand>
  {
    public UpdateAppTokenCommandValidator()
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
