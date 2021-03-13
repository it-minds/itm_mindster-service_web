namespace AuthService.Models
{
  [System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.3.1.0 (Newtonsoft.Json v12.0.0.0)")]
  public partial class Services
  {
    public string Aud { get; set; }

    public System.Collections.Generic.ICollection<int> Access { get; set; }

    private System.Collections.Generic.IDictionary<string, object> _additionalProperties = new System.Collections.Generic.Dictionary<string, object>();

    public System.Collections.Generic.IDictionary<string, object> AdditionalProperties
    {
      get { return _additionalProperties; }
      set { _additionalProperties = value; }
    }
  }
}
