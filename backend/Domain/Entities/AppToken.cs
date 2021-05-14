using System.Collections.Generic;
using Domain.Enums;

namespace Domain.Entities
{
  public class AppToken
  {
    public int Id { get; set; }
    public string TokenIdentifier { get; set; }
    public string Description { get; set; }
    public TokenStates State { get; set; }
    public virtual ICollection<AppTokenAction> AppTokenActions { get; set; }
    public int ApplicationId { get; set; }
    public virtual ApplicationEntity Application { get; set; }

  }
}
