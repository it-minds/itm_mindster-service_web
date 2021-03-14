namespace AuthService.Client
{
  public partial class BaseClient : BaseInterface
  {
    public string BaseUrl { get; set; }

    public BaseClient() {
      // Testing Build.
      // TODO: Replace with options from appsettings / environment
      BaseUrl = "https://example.com";
    }
  }
}
