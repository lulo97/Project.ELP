public record WordRequestBody
{
    //Model auto bindling from request body [FromBody] must explicitly declare { get; set } for fields
    public string word { get; set; } = "";
    public string user_id { get; set; } = "";
    public string id { get; set; } = "";
    public string username { get; set; } = "";

    public override string ToString()
    {
        return $"WordRequestBody {{ word = {word}, user_id = {user_id}, id = {id}, username = {username} }}";
    }
}