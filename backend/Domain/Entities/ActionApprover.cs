namespace Domain.Entities
{
  public class ActionApprover
  {
    public int Id { get; set; }
    public int ActionId { get; set; }
    public string Email { get; set; }
  }
}
