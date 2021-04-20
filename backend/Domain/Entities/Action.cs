namespace Domain.Entities
{
  public class Action
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string ActionIdentifier { get; set; }
    public string AdminNote { get; set; }
    public int ServiceId { get; set; }
    public virtual Service Service { get; set; }
  }
}
