using System.Data;
using FluentValidation;

namespace Application.AppTokens.Commands.Update
{
  public class UpdateAppTokenCommandValidator : AbstractValidator<UpdateAppTokenCommand>
  {
    public UpdateAppTokenCommandValidator()
    {
      RuleFor(e => e.AppToken)
        .NotNull();
      RuleFor(e => e.AppToken.AppTokenActions)
        .NotNull();
    }
    
  }
}
