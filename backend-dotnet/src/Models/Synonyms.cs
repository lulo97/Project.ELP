using System;
using System.Collections.Generic;

namespace Models;

public partial class synonyms
{
    public string id { get; set; } = null!;

    public string word { get; set; } = null!;

    public string synonym { get; set; } = null!;

    public string? note { get; set; }

    public string user_id { get; set; } = null!;
}
