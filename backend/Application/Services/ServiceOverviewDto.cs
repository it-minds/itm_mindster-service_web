using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Services
{
  public class ServiceOverviewDto : IAutoMap<Service>
  {
    public string Title { get; set; }
    public string ServiceIdentifier { get; set; }
    public int Id { get; set; }
  }
}
