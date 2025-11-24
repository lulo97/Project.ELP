public record TtsRequestBody
{
    public string id { get; set; } = "";
    public string? text { get; set; }
    public string? audio_base64 { get; set; }

    public override string ToString()
    {
        return $"TtsRequestBody {{ id = {id}, text = {text}, audio_base64 = [base64_length={audio_base64?.Length ?? 0}] }}";
    }
}
