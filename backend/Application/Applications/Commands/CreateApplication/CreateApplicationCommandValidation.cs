using FluentValidation;

namespace Application.Applications.Commands.CreateApplication
{
  public class CreateApplicationCommandValidation : AbstractValidator<CreateApplicationCommand>
  {
    public CreateApplicationCommandValidation()
    {
      RuleFor(e => e.Application)
        .NotNull();
      RuleFor(e => e.Application.Title)
        .MaximumLength(200)
        .NotEmpty();
      RuleFor(e => e.Application.AppIdentifier)
        .NotEmpty()
        .MaximumLength(200)
        .Matches("^[a-z_]*$");

    }
  }
}
