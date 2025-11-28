using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;
using Utils;
using static System.Runtime.InteropServices.JavaScript.JSType;

[ApiController]
[Route("api/[controller]")]
public class AIController : ControllerBase
{
    private readonly AIService _service;

    public AIController(AIService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<ApiResponse<object>> Call([FromBody] AIRequestBody body)
    {
        Console.WriteLine("Call api, time = " + DateTime.UtcNow);
        return await _service.Call(body);
    }

    [HttpGet("events")]
    public async Task<ApiResponse<object>> GetEvents([FromQuery] string id)
    {
        return await _service.GetEvents(id);
    }

    [HttpGet("events_poll")]
    public async Task<ApiResponse<object>> GetEventsPoll(
    [FromQuery] string old_event,
    [FromQuery] string id,
    [FromQuery] string second_delay)
    {
        //Console.WriteLine($"Received GetEventsPoll request. old_event='{old_event}', id='{id}', second_delay='{second_delay}'");

        if (string.IsNullOrEmpty(second_delay)) return ApiResponse<object>.Fail("second_delay is null!");

        object? old_event_json = null;

        try
        {
            old_event_json = JsonSerializer.Deserialize<object>(old_event)!;
        }
        catch (Exception)
        {
            return ApiResponse<object>.Fail("Invalid JSON in old_event");
        }

        if (old_event_json == null) return ApiResponse<object>.Fail("old_event is null!");

        var currentEvent = await _service.GetEvents(id);

        object old_data = ((JsonElement)old_event_json!).GetProperty("data");
        object new_data = currentEvent.Data!;

        string old_data_string = JsonSerializer.Serialize(old_data);
        string new_data_string = JsonSerializer.Serialize(new_data);

        bool is_equal = old_data_string == new_data_string;

        var max_try = 20;
        var count = 0;

        while (is_equal)
        {
            if (count == max_try)
            {
                return ApiResponse<object>.Fail($"Max try = {max_try} pooling reached!");
            }

            await Task.Delay(int.Parse(second_delay) * 1000);

            currentEvent = await _service.GetEvents(id);

            new_data = currentEvent.Data!;

            new_data_string = JsonSerializer.Serialize(new_data);

            is_equal = old_data_string == new_data_string;

            count += 1;
        }

        return currentEvent;
    }
}
