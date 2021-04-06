namespace AuthService.Client
{

  public class AuthServiceOptions
  {
    public const string Service = "AuthService";

    public string Url { get; set; }
    public string Token { get; set; }

    public string AppId { get; set; }
    public string AppSecret { get; set; }
  }
}
