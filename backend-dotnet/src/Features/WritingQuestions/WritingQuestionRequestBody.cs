public record WritingQuestionRequestBody
{
    public string id { get; set; } = "";
    public string question { get; set; } = "";
    public string user_id { get; set; } = "";
    public string username { get; set; } = "";

    public override string ToString()
    {
        return $"WritingQuestionRequestBody {{ id={id}, question={question}, username={username}, user_id={user_id} }}";
    }
}
