using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
    }
  }
}
