using System;
using System.Collections.Generic;

namespace Models;

public partial class Tts
{
    public string? Id { get; set; }

    public string? Text { get; set; }

    public string? AudioBase64 { get; set; }
}
