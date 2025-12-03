using Models;
using Microsoft.AspNetCore.Mvc;
using Utils;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [ApiController]
    [Route("api/part_of_speechs")]
    public class PartOfSpeechsControler : ControllerBase
    {
        private readonly PartOfSpeechsService _service;

        public PartOfSpeechsControler(PartOfSpeechsService service)
        {
            _service = service;
        }

        [HttpGet]
        [Authorize]
        public async Task<ApiResponse<List<part_of_speechs>>> Get(
            [FromQuery] string? word
        )
        {
            return await _service.Get(word);
        }
    }
}
