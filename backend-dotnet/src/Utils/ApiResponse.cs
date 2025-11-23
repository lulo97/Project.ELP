namespace Utils
{
    public class ApiResponse<T>
    {
        public T? Data { get; set; }
        public string? Error { get; set; }

        // Generic Ok with optional data (nullable)
        public static ApiResponse<T> Ok(T? data = default) => new ApiResponse<T> { Data = data };

        public static ApiResponse<T> Fail(string error) => new ApiResponse<T> { Error = error };

        public static ApiResponse<T> Fail(Translation data, string lang = "en")
        {
            return new ApiResponse<T> { Error = GetTranslation(data, lang) };
        }

        private static string GetTranslation(Translation data, string language = "en")
        {
            return language.ToLower() switch
            {
                "vi" => data.VI,
                _ => data.EN
            };
        }
    }

    // Non-generic helper for simpler syntax
    public static class ApiResponse
    {
        // default type = object
        public static ApiResponse<object> Ok(object? data = null) => ApiResponse<object>.Ok(data);

        public static ApiResponse<object> Fail(string error) => ApiResponse<object>.Fail(error);

        public static ApiResponse<object> Fail(Translation data, string lang = "en") =>
            ApiResponse<object>.Fail(data, lang);
    }
}
