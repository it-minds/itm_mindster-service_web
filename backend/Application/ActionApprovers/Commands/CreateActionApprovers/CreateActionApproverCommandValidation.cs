using FluentValidation;

namespace Application.ActionApprovers.Commands.CreateActionApprovers
{
  public class CreateActionApproverCommandValidation : AbstractValidator<CreateActionApproverCommand>
  {
    public CreateActionApproverCommandValidation()
    {
      RuleFor(e => e.Id)
        .NotEmpty();
      RuleFor(e => e.ActionApprovers)
        .NotNull();
      RuleForEach(e => e.ActionApprovers)
        .Must(owner => owner.Email != null);
    }
  }
}
