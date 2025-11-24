using System;
using System.Collections.Generic;

namespace Models;

public partial class tts
{
    public string id { get; set; } = null!;

    public string? text { get; set; }

    public string? audio_base64 { get; set; }
}
