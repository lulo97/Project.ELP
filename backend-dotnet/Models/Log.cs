using System;
using System.Collections.Generic;

namespace Models;

public partial class Log
{
    public string Id { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public string Text { get; set; } = null!;
}
