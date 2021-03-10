using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities;

namespace Application.Applications
{
  public class ApplicationIdDto : ApplicationDto
  {
    public int Id { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<ApplicationEntity, ApplicationIdDto>()
        .IncludeBase<ApplicationEntity, ApplicationDto>();
    }
  }
}
