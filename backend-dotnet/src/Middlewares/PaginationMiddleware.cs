using System.Text;
using System.Text.Json;
using Utils;

public class PaginationMiddleware
{
    private readonly RequestDelegate _next;

    public PaginationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (
            context.Request.Path.StartsWithSegments("/api/ai") ||
            context.Request.Path.StartsWithSegments("/api/youtube")
        )
        {
            await _next(context);
            return;
        }

        context.Request.EnableBuffering();

        string requestBody = "";
        if (context.Request.ContentLength > 0)
        {
            using var reader = new StreamReader(context.Request.Body, Encoding.UTF8, leaveOpen: true);
            requestBody = await reader.ReadToEndAsync();
            context.Request.Body.Position = 0;
        }

        var originalBodyStream = context.Response.Body;
        using var newBodyStream = new MemoryStream();
        context.Response.Body = newBodyStream;

        // Continue pipeline
        await _next(context);

        newBodyStream.Seek(0, SeekOrigin.Begin);
        string responseBody = await new StreamReader(newBodyStream).ReadToEndAsync();
        newBodyStream.Seek(0, SeekOrigin.Begin);

        // Quick safe checks
        if (string.IsNullOrWhiteSpace(responseBody) ||
            context.Response.ContentType == null ||
            !context.Response.ContentType.Contains("application/json", StringComparison.OrdinalIgnoreCase))
        {
            context.Response.Body = originalBodyStream;
            //System.InvalidOperationException: 'Cannot write to response body after connection has been upgraded.'
            await context.Response.WriteAsync(responseBody);
            return;
        }

        JsonDocument document;
        try
        {
            document = JsonDocument.Parse(responseBody);
        }
        catch
        {
            // Not valid JSON → ignore
            context.Response.Body = originalBodyStream;
            await context.Response.WriteAsync(responseBody);
            return;
        }

        var root = document.RootElement;

        // Try get "error"
        if (!root.TryGetProperty("error", out var errorElement))
        {
            context.Response.Body = originalBodyStream;
            await context.Response.WriteAsync(responseBody);
            return;
        }

        // Try get "data"
        if (!root.TryGetProperty("data", out var dataElement))
        {
            context.Response.Body = originalBodyStream;
            await context.Response.WriteAsync(responseBody);
            return;
        }

        // Must be array
        if (dataElement.ValueKind != JsonValueKind.Array)
        {
            context.Response.Body = originalBodyStream;
            await context.Response.WriteAsync(responseBody);
            return;
        }

        // Pagination
        var query = context.Request.Query;

        //Return default response if pageSize not pass
        if (query.TryGetValue("pageSize", out var pageSizeRaw) && string.IsNullOrWhiteSpace(pageSizeRaw))
        {
            context.Response.Body = originalBodyStream;
            await context.Response.WriteAsync(responseBody);
            return;
        }

        int pageIndex = int.TryParse(query["pageIndex"], out var p) ? p : CONSTS.PAGE_INDEX;
        int pageSize = int.TryParse(query["pageSize"], out var s) ? s : CONSTS.PAGE_SIZE;

        var list = JsonSerializer.Deserialize<List<object>>(dataElement.GetRawText());
        int totalCount = list?.Count ?? 0;

        var paged = list?
            .Skip((pageIndex - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        // errorElement is JsonElement → must serialize its raw JSON correctly
        string errorJson = errorElement.GetRawText();
        var errorObj = JsonSerializer.Deserialize<object>(errorJson);

        var newResponse = new
        {
            data = paged,
            error = errorObj,
            pagination = new
            {
                pageIndex,
                pageSize,
                totalCount,
                totalPages = (int)Math.Ceiling((double)totalCount / pageSize)
            }
        };

        string newJson = JsonSerializer.Serialize(newResponse);

        context.Response.Body = originalBodyStream;
        await context.Response.WriteAsync(newJson);
    }
}
