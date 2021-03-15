using System.Collections.Generic;

namespace Domain.Entities
{
  public class AppToken
  {
    public int Id { get; set; }
    public virtual ICollection<AppTokenAction> AppTokenActions { get; set; }
    public int ApplicationId { get; set; }
    public virtual ApplicationEntity Application { get; set; }

  }
}
