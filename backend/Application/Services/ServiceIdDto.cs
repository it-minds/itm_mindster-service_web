
using System.Collections.Generic;
using Application.Actions;
using AutoMapper;
using Domain.Entities;

namespace Application.Services
{
  public class ServiceIdDto : ServiceDto
  {
    public int Id { get; set; }
    public ICollection<ActionIdDto> Actions { get; set; }

    public void Mapping(Profile profile)
    {
      profile.CreateMap<Service, ServiceIdDto>()
        .IncludeBase<Service, ServiceDto>();
    }
  }
}
