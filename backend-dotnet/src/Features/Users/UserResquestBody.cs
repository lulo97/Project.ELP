namespace backend_dotnet.src.Features.Users
{
    public class UserResquestBody
    {
        public string id { get; set; } = "";
        public string username { get; set; } = "";
        public string login_username { get; set; } = "";

        public override string ToString()
        {
            return $"UserResquestBody {{ id = {id}, username = {username} , login_username = {login_username}}}";
        }
    }
}
