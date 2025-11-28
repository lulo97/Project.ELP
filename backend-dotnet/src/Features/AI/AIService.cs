using Microsoft.AspNetCore.WebUtilities;
using StackExchange.Redis;
using System.Text;
using System.Text.Json;
using Utils;

public class AIService
{
    private readonly IConnectionMultiplexer redis;
    private readonly HttpClient client;
    private readonly string AI_HOST = Environment.GetEnvironmentVariable("PG_HOST") ?? "http://localhost:8001";
    public AIService(HttpClient _client, IConnectionMultiplexer _redis)
    {
        client = _client;
        redis = _redis;
    }
    public async Task<ApiResponse<object>> Call(AIRequestBody body)
    {
        if (body == null)
            return ApiResponse.Fail("Request body null!");

        string url = AI_HOST + "/api";

        string jsonBody = JsonSerializer.Serialize(body);

        var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

        HttpResponseMessage response = await client.PostAsync(url, content);

        response.EnsureSuccessStatusCode();

        var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse<object>>();

        return responseContent!;
    }

    public async Task<ApiResponse<object>> GetEvents(string id)
    {
        if (string.IsNullOrWhiteSpace(id))
            return ApiResponse.Fail("Parameter 'id' is required");

        string baseUrl = AI_HOST + "/events";

        string url = QueryHelpers.AddQueryString(baseUrl, "id", id);

        HttpResponseMessage response = await client.GetAsync(url);

        response.EnsureSuccessStatusCode();

        var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse<object>>();

        return responseContent!;
    }
}
