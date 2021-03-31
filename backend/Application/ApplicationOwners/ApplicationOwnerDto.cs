using Application.Common.Mappings;
using Domain.Entities;

namespace Application.ApplicationOwners
{
  public class ApplicationOwnerDto : IAutoMap<ApplicationOwner>
  {
    public string Email { get; set; }
  }
}
