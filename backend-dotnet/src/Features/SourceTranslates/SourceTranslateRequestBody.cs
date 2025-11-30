namespace Models;

public record Chunk
{
    public string chunk { get; set; } = "";
    public string translate { get; set; } = "";
}

public record SourceTranslateRequestBody
{
    // Model auto-binding from request body [FromBody] must explicitly declare { get; set } for fields
    public string source_id { get; set; } = "";
    public List<Chunk> chunks { get; set; } = new List<Chunk>();
    public string user_id { get; set; } = "";
    public string username { get; set; } = "";

    public override string ToString()
    {
        return $"SourceTranslateRequestBody {{ source_id = {source_id}, chunks = {chunks}, user_id = {user_id}, username = {username} }}";
    }
}
