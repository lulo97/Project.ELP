using System;
using System.Collections.Generic;

namespace Models;

public partial class idioms
{
    public string id { get; set; } = null!;

    public string idiom { get; set; } = null!;

    public string meaning { get; set; } = null!;

    public string? example { get; set; }

    public string user_id { get; set; } = null!;
}
