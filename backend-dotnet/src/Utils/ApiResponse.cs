namespace Utils
{
    public class ApiResponse<T>
    {
        public T? Data { get; set; }
        public string? Error { get; set; }

        // SUCCESS
        public static ApiResponse<T> Ok(
            T? data = default)
        {
            return new ApiResponse<T>
            {
                Data = data,
            };
        }

        // FAIL (still includes pagination)
        public static ApiResponse<T> Fail(string error)
        {
            return new ApiResponse<T>
            {
                Error = error,
            };
        }
    }

    public static class ApiResponse
    {
        public static ApiResponse<object> Ok(
            object? data = null)
            => ApiResponse<object>.Ok(data);

        public static ApiResponse<object> Fail(string error)
            => ApiResponse<object>.Fail(error);
    }
}
