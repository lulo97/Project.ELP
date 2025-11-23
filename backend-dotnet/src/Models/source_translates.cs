using System;
using System.Collections.Generic;

namespace Models;

public partial class source_translates
{
    public string id { get; set; } = null!;

    public string chunk { get; set; } = null!;

    public string translate { get; set; } = null!;

    public string source_id { get; set; } = null!;

    public string user_id { get; set; } = null!;
}
