using System.Data;
using System.IO.Compression;
using FluentValidation;

namespace Application.AppTokens.Commands
{
  public class CreateAuthAppTokenCommandValidation : AbstractValidator<CreateAuthAppTokenCommand>
  {
    public CreateAuthAppTokenCommandValidation()
    {
      RuleFor(e => e.aId)
        .NotEmpty();
      RuleFor(e => e.xToken)
        .NotEmpty();
      RuleFor(e => e.TokenInput)
        .NotNull();
    }
  }
}
