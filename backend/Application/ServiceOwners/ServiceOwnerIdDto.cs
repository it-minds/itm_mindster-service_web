using AutoMapper;
using Domain.Entities;

namespace Application.ServiceOwners
{
  public class ServiceOwnerIdDto : ServiceOwnerDto
  {
    public int Id { get; set; }
    public void Mapping(Profile profile)
    {
      profile.CreateMap<ServiceOwner, ServiceOwnerIdDto>()
        .IncludeBase<ServiceOwner, ServiceOwnerDto>();
    }
  }
}
