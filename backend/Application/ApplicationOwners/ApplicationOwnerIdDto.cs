using Domain.Entities;
using AutoMapper;


namespace Application.ApplicationOwners
{
  public class ApplicationOwnerIdDto : ApplicationOwnerDto
  {
    public int Id { get; set; }
    public void Mapping(Profile profile)
    {
      profile.CreateMap<ApplicationOwner, ApplicationOwnerIdDto>()
        .IncludeBase<ApplicationOwner, ApplicationOwnerDto>();
    }
  }
}
