using Microsoft.AspNetCore.Mvc;
using Utils;


[ApiController]
[Route("api/[controller]")]
public class YoutubeController : ControllerBase
{
    private readonly YoutubeService _service;

    public YoutubeController(YoutubeService youtubeService)
    {
        _service = youtubeService;
    }

    [HttpGet("get_all_audios")]
    public async Task<ApiResponse<object>> GetAudios()
    {
        return await _service.GetAudios();
    }

    [HttpGet("transcript")]
    public async Task<ApiResponse<object>> GetTranscript([FromQuery] string? video_id)
    {
        if (video_id == null)
            return ApiResponse<object>.Fail("Missing video_id parameter");

        return await _service.GetTranscript(video_id);
    }

    [HttpGet("audio")]
    public async Task<ApiResponse<object>> GetAudio([FromQuery] string? video_id)
    {
        if (video_id == null)
            return ApiResponse<object>.Fail("Missing video_id parameter");

        return await _service.GetAudio(video_id);
    }

    [HttpGet("stream_audio")]
    public async Task<IActionResult> StreamAudio([FromQuery] string? video_id)
    {
        if (video_id == null)
            return BadRequest(new { data = (object?)null, error = "Missing video_id parameter" });

        string? range = Request.Headers.Range.ToString();

        var response = await _service.StreamAudio(video_id, range);

        if (!response.IsSuccessStatusCode)
            return StatusCode((int)response.StatusCode, new { error = "Failed to fetch audio stream" });

        // Copy headers
        foreach (var header in response.Headers)
            Response.Headers[header.Key] = string.Join(",", header.Value);

        foreach (var header in response.Content.Headers)
            Response.Headers[header.Key] = string.Join(",", header.Value);

        Response.Headers["Content-Type"] = "audio/mpeg";
        //Response.Headers["Transfer-Encoding"] = "chunked";
        Response.StatusCode = (int)response.StatusCode;

        var stream = await response.Content.ReadAsStreamAsync();
        return File(stream, "audio/mpeg", enableRangeProcessing: true);
    }
}

