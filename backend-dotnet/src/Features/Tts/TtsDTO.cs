public class TtsResponse
{
    public string error { get; set; } = "";
    public TtsData data { get; set; } = new TtsData();
}

public class TtsData
{
    public string audio_base64 { get; set; } = "";
    public string file_format { get; set; } = "";
}
