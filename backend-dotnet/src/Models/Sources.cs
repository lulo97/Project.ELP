using System;
using System.Collections.Generic;

namespace Models;

public partial class Sources
{
    public string Id { get; set; } = null!;

    public string Source { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string UserId { get; set; } = null!;
}
