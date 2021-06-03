using FluentValidation;

namespace Application.Applications.Commands.CreateAppSecret
{
  public class CreateAppSecretCommandValidation : AbstractValidator<CreateAppSecretCommand>
  {
    public CreateAppSecretCommandValidation()
    {
      RuleFor(e => e.AppId)
        .NotNull();
    }
  }
}
