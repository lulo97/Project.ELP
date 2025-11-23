using System;
using System.Collections.Generic;

namespace Models;

public partial class Words
{
    public string Id { get; set; } = null!;

    public string Word { get; set; } = null!;

    public string UserId { get; set; } = null!;
}
