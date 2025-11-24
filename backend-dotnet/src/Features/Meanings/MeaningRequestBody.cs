public record MeaningRequestBody
{
    public string id { get; set; } = "";
    public string word { get; set; } = "";
    public string meaning { get; set; } = "";
    public string part_of_speech { get; set; } = "";
    public string user_id { get; set; } = "";
    public string username { get; set; } = "";

    public override string ToString()
    {
        return $"MeaningRequestBody {{ id = {id}, word = {word}, meaning = {meaning}, part_of_speech = {part_of_speech}, user_id = {user_id}, username = {username} }}";
    }
}
