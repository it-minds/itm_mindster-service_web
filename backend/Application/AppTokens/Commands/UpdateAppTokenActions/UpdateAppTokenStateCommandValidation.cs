using System.Data;
using FluentValidation;

namespace Application.AppTokens.Commands.UpdateAppTokenActions
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
