namespace Models;

public record SourceRequestBody
{
    // Model auto-binding from request body [FromBody] must explicitly declare { get; set } for fields
    public string id { get; set; } = "";
    public string source { get; set; } = "";
    public string name { get; set; } = "";
    public string user_id { get; set; } = "";
    public string username { get; set; } = "";

    public override string ToString()
    {
        return $"SourceRequestBody {{ id = {id}, source = {source}, name = {name}, user_id = {user_id}, username = {username} }}";
    }
}
