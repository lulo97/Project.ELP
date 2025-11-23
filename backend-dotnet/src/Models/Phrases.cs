using System;
using System.Collections.Generic;

namespace Models;

public partial class Phrases
{
    public string Id { get; set; } = null!;

    public string Phrase { get; set; } = null!;

    public string Meaning { get; set; } = null!;

    public string? Example { get; set; }

    public string UserId { get; set; } = null!;
}
