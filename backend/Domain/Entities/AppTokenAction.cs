using Domain.Enums;

namespace Domain.Entities
{
  public class AppTokenAction
  {
    public int Id { get; set; }
    public ServiceStates State { get; set; }
    public string RejectionReason { get; set; }
    public int AppTokenId { get; set; }
    public virtual AppToken AppToken { get; set; }
    public int ActionId { get; set; }
    public virtual Action Action { get; set; }

  }
}
