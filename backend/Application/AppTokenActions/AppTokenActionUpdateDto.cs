using Application.AppTokens;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;

namespace Application.AppTokenActions
{
  public class AppTokenActionUpdateDto : IAutoMap<AppTokenAction>
  {
    public ServiceStates State { get; set; }
    public string RejectionReason { get; set; }
    public int Id { get; set; }

  }
}
