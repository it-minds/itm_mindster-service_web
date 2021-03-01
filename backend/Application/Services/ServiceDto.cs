using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;

namespace Application.Services
{
  public class ServiceDto : IAutoMap<Domain.Entities.Service>
  {
    public string Title { get; set; }
    public string Description { get; set; }
    public ServiceStates State { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<Service, ServiceDto>();
    }

  }
}
