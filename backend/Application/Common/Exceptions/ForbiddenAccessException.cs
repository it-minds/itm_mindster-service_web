using System;

namespace Application.Common.Exceptions
{
  public class ForbiddenAccessException : Exception
  {
    public ForbiddenAccessException()
        : base()
    {
    }
    public ForbiddenAccessException(string message)
      : base(message)
    {
    }
    public ForbiddenAccessException(string name, object key)
      : base($"Entity \"{name}\" ({key}) you are not authorized for the given {name}")
    {
    }
  }
}
