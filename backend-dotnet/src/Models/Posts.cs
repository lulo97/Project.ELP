using System;
using System.Collections.Generic;

namespace Models;

public partial class posts
{
    public string id { get; set; } = null!;

    public string title { get; set; } = null!;

    public string content { get; set; } = null!;

    public string user_id { get; set; } = null!;
}
