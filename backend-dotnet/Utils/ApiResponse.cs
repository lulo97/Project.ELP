namespace Utils
{
    public class ApiResponse<T>
    {
        public T? Data { get; set; }
        public string? Error { get; set; }

        public static ApiResponse<T> Ok(T data) => new ApiResponse<T> { Data = data };

        public static ApiResponse<T> Fail(string error) => new ApiResponse<T> { Error = error };

        // Short helper to get translation and return Fail
        public static ApiResponse<T> Fail(Translation data, string lang = "en")
        {
            return new ApiResponse<T> { Error = GetTranslation(data, lang) };
        }

        // Internal translation helper (can be private)
        private static string GetTranslation(Translation data, string language = "en")
        {
            return language.ToLower() switch
            {
                "vi" => data.VI,
                _ => data.EN
            };
        }
    }
}
