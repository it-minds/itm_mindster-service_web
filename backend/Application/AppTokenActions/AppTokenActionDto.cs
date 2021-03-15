using Application.Common.Mappings;
using Domain.Entities;

namespace Application.AppTokenActions
{
  public class AppTokenActionDto : IAutoMap<AppTokenAction>
  {
    public int ActionId { get; set; }
  }
}
