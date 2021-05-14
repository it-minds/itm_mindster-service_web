using Application.AppTokens.Commands.UpdateAppTokenActions;
using FluentValidation;

namespace Application.AppTokens.Commands.UpdateAppTokenState
{
  public class UpdateAppTokenStateCommandValidation : AbstractValidator<UpdateAppTokenStateCommand>
  {
    public UpdateAppTokenStateCommandValidation()
    {
      RuleFor(e => e.Id)
        .NotEmpty();
      RuleFor(e => e.NewState)
        .IsInEnum()
        .NotNull();
    }
  }
}
