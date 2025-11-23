using System;
using System.Collections.Generic;

namespace Models;

public partial class Events
{
    public string? Id { get; set; }

    public string? Timestamp { get; set; }

    public string? Status { get; set; }

    public string? Data { get; set; }
}
