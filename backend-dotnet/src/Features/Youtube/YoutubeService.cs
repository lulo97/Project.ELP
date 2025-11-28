using System.Net.Http.Headers;
using Utils;

public class YoutubeService
{
    private readonly HttpClient _httpClient;
    private readonly string _utilsHost;

    // FIXED: This must accept HttpClient, not IHttpClientFactory
    public YoutubeService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _utilsHost = Environment.GetEnvironmentVariable("UTILS_HOST") ?? "http://localhost:3002";
    }

    public async Task<ApiResponse<object>> GetAudios()
    {
        var response = await _httpClient.GetAsync($"{_utilsHost}/get_audios");
        return await response.Content.ReadFromJsonAsync<ApiResponse<object>>()
               ?? ApiResponse<object>.Fail("Invalid response");
    }

    public async Task<ApiResponse<object>> GetTranscript(string videoId)
    {
        var response = await _httpClient.GetAsync($"{_utilsHost}/transcript?video_id={videoId}");
        return await response.Content.ReadFromJsonAsync<ApiResponse<object>>()
               ?? ApiResponse<object>.Fail("Invalid response");
    }

    public async Task<ApiResponse<object>> GetAudio(string videoId)
    {
        var response = await _httpClient.GetAsync($"{_utilsHost}/audio?video_id={videoId}");
        return await response.Content.ReadFromJsonAsync<ApiResponse<object>>()
               ?? ApiResponse<object>.Fail("Invalid response");
    }

    public async Task<HttpResponseMessage> StreamAudio(string videoId, string? rangeHeader)
    {
        var request = new HttpRequestMessage(
            HttpMethod.Get,
            $"{_utilsHost}/stream_audio?video_id={videoId}"
        );

        if (!string.IsNullOrEmpty(rangeHeader))
            request.Headers.Range = RangeHeaderValue.Parse(rangeHeader);

        return await _httpClient.SendAsync(
            request,
            HttpCompletionOption.ResponseHeadersRead
        );
    }
}
