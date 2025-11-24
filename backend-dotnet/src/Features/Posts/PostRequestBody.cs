namespace Models;

public record PostRequestBody
{
    // Model auto-binding from request body [FromBody] must explicitly declare { get; set } for fields
    public string id { get; set; } = "";
    public string title { get; set; } = "";
    public string content { get; set; } = "";
    public string user_id { get; set; } = "";
    public string username { get; set; } = "";

    public override string ToString()
    {
        return $"PostRequestBody {{ id = {id}, title = {title}, content = {content}, user_id = {user_id}, username = {username} }}";
    }
}
