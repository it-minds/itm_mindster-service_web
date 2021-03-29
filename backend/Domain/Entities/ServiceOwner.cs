namespace Domain.Entities
{
  public class ServiceOwner
  {
    public int Id { get; set; }
    public int ServiceId { get; set; }
    public string Email { get; set; }
  }
}
