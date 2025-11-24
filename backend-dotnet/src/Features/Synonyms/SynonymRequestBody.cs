public record SynonymRequestBody
{
    public string id { get; set; } = "";
    public string word { get; set; } = "";
    public string synonym { get; set; } = "";
    public string? note { get; set; }
    public string user_id { get; set; } = "";
    public string username { get; set; } = "";

    public override string ToString()
    {
        return $"SynonymRequestBody {{ id = {id}, word = {word}, synonym = {synonym}, note = {note}, user_id = {user_id}, username = {username} }}";
    }
}
