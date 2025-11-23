namespace Utils
{
    public class PaginationData
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }

        public PaginationData(
            int pageIndex = CONSTS.PAGE_INDEX,
            int pageSize = CONSTS.PAGE_SIZE,
            int totalCount = 0)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalCount = totalCount;
            TotalPages = pageSize > 0
                ? (int)Math.Ceiling(totalCount / (double)pageSize)
                : 0;
        }
    }

    public class ApiResponse<T>
    {
        public T? Data { get; set; }
        public string? Error { get; set; }

        // Always included, never null
        public PaginationData Pagination { get; set; } =
            new PaginationData(CONSTS.PAGE_INDEX, CONSTS.PAGE_SIZE, 0);

        // SUCCESS
        public static ApiResponse<T> Ok(
            T? data = default,
            int pageIndex = CONSTS.PAGE_INDEX,
            int pageSize = CONSTS.PAGE_SIZE,
            int totalCount = 0)
        {
            return new ApiResponse<T>
            {
                Data = data,
                Pagination = new PaginationData(pageIndex, pageSize, totalCount)
            };
        }

        // FAIL (still includes pagination)
        public static ApiResponse<T> Fail(string error)
        {
            return new ApiResponse<T>
            {
                Error = error,
                Pagination = new PaginationData()
            };
        }

        public static ApiResponse<T> Fail(Translation data, string lang = "en")
        {
            return new ApiResponse<T>
            {
                Error = GetTranslation(data, lang),
                Pagination = new PaginationData()
            };
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

    public static class ApiResponse
    {
        public static ApiResponse<object> Ok(
            object? data = null,
            int pageIndex = CONSTS.PAGE_INDEX,
            int pageSize = CONSTS.PAGE_SIZE,
            int totalCount = 0)
            => ApiResponse<object>.Ok(data, pageIndex, pageSize, totalCount);

        public static ApiResponse<object> Fail(string error)
            => ApiResponse<object>.Fail(error);

        public static ApiResponse<object> Fail(Translation data, string lang = "en")
            => ApiResponse<object>.Fail(data, lang);
    }
}
