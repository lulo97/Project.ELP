namespace Models;

public record IdiomRequestBody
{
    public string idiom { get; set; } = "";
    public string meaning { get; set; } = "";
    public string? example { get; set; } = "";
    public string user_id { get; set; } = "";
    public string id { get; set; } = "";
    public string username { get; set; } = "";

    public override string ToString()
    {
        return $"IdiomRequestBody {{ idiom = {idiom}, meaning = {meaning}, example = {example}, user_id = {user_id}, id = {id}, username = {username} }}";
    }
}
