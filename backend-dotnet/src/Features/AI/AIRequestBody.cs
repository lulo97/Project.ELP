public record AIRequestBody
{
    public object input { get; set; } = new object();
    public string feature { get; set; } = "";
    public string event_id { get; set; } = "";

    public override string ToString()
    {
        return $"AIRequestBody {{ input = {input}, feature = {feature}, event_id = {event_id} }}";
    }
}
