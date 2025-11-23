using System;
using System.Collections.Generic;

namespace Models;

public partial class log
{
    public string id { get; set; } = null!;

    public DateTime created_at { get; set; }

    public string text { get; set; } = null!;
}
