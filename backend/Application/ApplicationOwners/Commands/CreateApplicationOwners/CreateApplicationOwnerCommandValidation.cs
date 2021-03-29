using FluentValidation;

namespace Application.ApplicationOwners.Commands.CreateApplicationOwners
{
  public class CreateApplicationOwnerCommandValidation : AbstractValidator<CreateApplicationOwnerCommand>
  {
    public CreateApplicationOwnerCommandValidation()
    {
      RuleFor(e => e.Id)
        .NotEmpty();
      RuleFor(e => e.AppOwners)
        .NotNull();
      RuleForEach(e => e.AppOwners)
        .Must(owner => owner.Email != null);
    }


  }
}
