using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Application.Services.Commands.CreateService
{
  public class CreateServiceCommandValidation : AbstractValidator<CreateServiceCommand>
  {
    public CreateServiceCommandValidation()
    {
      RuleFor(e => e.Service)
        .NotNull();
      RuleFor(e => e.Service.Title)
        .MaximumLength(200)
        .NotEmpty();
      RuleFor(e => e.Service.ServiceIdentifier)
        .NotNull()
        .MaximumLength(200)
        .Matches("[a-z_]+");
    }
  }
}
