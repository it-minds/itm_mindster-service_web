namespace Domain.Entities
{
  public class ApplicationOwner
  {
    public int Id { get; set; }
    public int ApplicationId { get; set; }
    public string Email { get; set; }
  }
}
