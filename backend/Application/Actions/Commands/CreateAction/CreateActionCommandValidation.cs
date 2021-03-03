using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Application.Actions.Commands.CreateAction
{
  public class CreateActionCommandValidation : AbstractValidator<CreateActionCommand>
  {
    public CreateActionCommandValidation()
    {
      RuleFor(e => e.Action)
        .NotNull();
      RuleFor(e => e.Action.Title)
        .MaximumLength(200)
        .NotEmpty();
      RuleFor(e => e.Id)
        .NotNull();
    }
  }
}
