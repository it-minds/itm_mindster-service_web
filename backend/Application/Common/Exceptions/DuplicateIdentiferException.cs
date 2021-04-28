using System;

namespace Application.Common.Exceptions
{
  public class DuplicateIdentifierException : Exception
  {
    public DuplicateIdentifierException()
      : base()
    {
    }

    public DuplicateIdentifierException(string message)
      : base(message)
    {
    }

    public DuplicateIdentifierException(string message, Exception innerException)
      : base(message, innerException)
    {
    }

    public DuplicateIdentifierException(string name, object key)
      : base($"Entity \"{name}\" ({key}) is not a unique identifier")
    {
    }
  }
}
