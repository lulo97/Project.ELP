namespace Models;

public record SourceTranslateRequestBody
{
    // Model auto-binding from request body [FromBody] must explicitly declare { get; set } for fields
    public string id { get; set; } = "";
    public string chunk { get; set; } = "";
    public string translate { get; set; } = "";
    public string source_id { get; set; } = "";
    public string user_id { get; set; } = "";
    public string username { get; set; } = "";

    public override string ToString()
    {
        return $"SourceTranslateRequestBody {{ id = {id}, chunk = {chunk}, translate = {translate}, source_id = {source_id}, user_id = {user_id}, username = {username} }}";
    }
}
