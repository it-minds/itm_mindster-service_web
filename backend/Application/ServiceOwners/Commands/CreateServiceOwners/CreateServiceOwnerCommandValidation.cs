using FluentValidation;

namespace Application.ServiceOwners.Commands.CreateServiceOwners
{
  public class CreateServiceOwnerCommandValidation : AbstractValidator<CreateServiceOwnerCommand>
  {
    public CreateServiceOwnerCommandValidation()
    {
      RuleFor(e => e.Id)
        .NotEmpty();
      RuleFor(e => e.ServiceOwners)
        .NotNull();
      RuleForEach(e => e.ServiceOwners)
        .Must(owner => owner.Email != null);
    }
  }
}
