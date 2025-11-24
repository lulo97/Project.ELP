public record WritingAnswerRequestBody
{
    public string id { get; set; } = "";
    public string? question_id { get; set; }
    public string? answer { get; set; }
    public string? review { get; set; }

    public string username { get; set; } = "";
    public string user_id { get; set; } = "";

    public override string ToString()
    {
        return $"WritingAnswerRequestBody {{ id={id}, question_id={question_id}, answer={answer}, review={review}, username={username}, user_id={user_id} }}";
    }
}
