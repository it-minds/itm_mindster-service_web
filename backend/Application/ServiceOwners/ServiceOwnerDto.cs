using Application.Common.Mappings;
using Domain.Entities;

namespace Application.ServiceOwners
{
  public class ServiceOwnerDto : IAutoMap<ServiceOwner>
  {
    public string Email { get; set; }
  }
}
