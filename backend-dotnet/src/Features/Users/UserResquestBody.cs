public class UserRequestBody
{
    public string id { get; set; } = "";
    public string username { get; set; } = "";
    public string email { get; set; } = "";
    public string password_hash { get; set; } = "";
    public string fullName { get; set; } = "";
    public bool is_active { get; set; }
    public DateTime created_at { get; set; }
}
