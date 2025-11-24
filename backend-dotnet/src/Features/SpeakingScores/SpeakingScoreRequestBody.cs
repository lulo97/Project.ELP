namespace Models;

public record SpeakingScoreRequestBody
{
    public string? id { get; set; }
    public string? speaking_id { get; set; }
    public decimal? score { get; set; }
    public string? text_listened { get; set; }
    public string? text { get; set; }
    public string? username { get; set; }

    public override string ToString()
    {
        return $"SpeakingScoreRequestBody {{ id = {id}, speaking_id = {speaking_id}, score = {score}, text_listened = {text_listened}, text = {text}, username = {username} }}";
    }
}
