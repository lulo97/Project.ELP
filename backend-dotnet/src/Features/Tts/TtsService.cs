using Microsoft.EntityFrameworkCore;
using Models;
using System.Net.Http;
using System.Net.Http.Json;
using Utils;
using static Utils.ApiResponse<Models.tts>;
using static Utils.Utils;

public class TtsService
{
    private readonly AppDbContext _context;
    private readonly HttpClient _httpClient;

    public TtsService(AppDbContext context, HttpClient httpClient)
    {
        _context = context;
        _httpClient = httpClient; // already an HttpClient, no CreateClient() needed
    }

    // Fetch or create TTS for a given text
    public async Task<ApiResponse<tts>> GetOrCreateTts(string text)
    {
        if (string.IsNullOrWhiteSpace(text))
            return Fail("Missing text parameter");

        // Check if TTS already exists
        var existing = await _context.tts.FirstOrDefaultAsync(t => t.text!.ToLower() == text.ToLower());
        if (existing != null)
            return Ok(existing);

        // Fetch TTS from external service
        var ttsHost = Environment.GetEnvironmentVariable("UTILS_HOST") ?? "http://localhost:3002";

        var response = await _httpClient.GetAsync($"{ttsHost}/tts?text={Uri.EscapeDataString(text)}");

        if (!response.IsSuccessStatusCode)
            return Fail($"Error fetching TTS: {response.StatusCode}");

        var resultJson = await response.Content.ReadFromJsonAsync<TtsResponse>();
        if (resultJson == null || string.IsNullOrWhiteSpace(resultJson.data.audio_base64))
            return Fail("TTS service returned empty audio");

        // Save to database
        var newRecord = new tts
        {
            id = GetRandomId(),
            text = text,
            audio_base64 = resultJson.data.audio_base64
        };

        _context.tts.Add(newRecord);
        await _context.SaveChangesAsync();

        return Ok(newRecord);
    }
}
