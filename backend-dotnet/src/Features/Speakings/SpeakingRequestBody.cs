namespace Models;

public record SpeakingRequestBody
{
    public string? id { get; set; }
    public string? question { get; set; }
    public string? answer { get; set; }
    public string? username { get; set; }
    public string? user_id { get; set; }

    public override string ToString()
    {
        return $"SpeakingRequestBody {{ id = {id}, question = {question}, answer = {answer}, username = {username} }}";
    }
}
