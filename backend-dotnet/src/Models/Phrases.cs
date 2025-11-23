using System;
using System.Collections.Generic;

namespace Models;

public partial class phrases
{
    public string id { get; set; } = null!;

    public string phrase { get; set; } = null!;

    public string meaning { get; set; } = null!;

    public string? example { get; set; }

    public string user_id { get; set; } = null!;
}
