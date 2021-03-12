using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Application.Applications.Commands.UpdateApplication
{
  public class UpdateApplicationCommandValidator : AbstractValidator<UpdateApplicationCommand>
  {
    public UpdateApplicationCommandValidator()
    {
      RuleFor(e => e.Application)
        .NotNull();
      RuleFor(e => e.Application.Title)
        .MaximumLength(200)
        .NotEmpty();
    }
  }
}
