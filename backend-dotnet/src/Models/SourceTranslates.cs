using System;
using System.Collections.Generic;

namespace Models;

public partial class SourceTranslates
{
    public string Id { get; set; } = null!;

    public string Chunk { get; set; } = null!;

    public string Translate { get; set; } = null!;

    public string SourceId { get; set; } = null!;

    public string UserId { get; set; } = null!;
}
