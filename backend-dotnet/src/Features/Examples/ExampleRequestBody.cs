public record ExampleRequestBody
{
    public string id { get; set; } = "";
    public string word { get; set; } = "";
    public string part_of_speech { get; set; } = "";
    public string example { get; set; } = "";
    public string user_id { get; set; } = "";
    public string username { get; set; } = "";

    public override string ToString()
    {
        return $"ExampleRequestBody {{ id = {id}, word = {word}, part_of_speech = {part_of_speech}, example = {example}, user_id = {user_id}, username = {username} }}";
    }
}
