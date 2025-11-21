using System;
using System.Collections.Generic;

namespace Models;

public partial class Synonyms
{
    public string Id { get; set; } = null!;

    public string Word { get; set; } = null!;

    public string Synonym { get; set; } = null!;

    public string? Note { get; set; }

    public string UserId { get; set; } = null!;
}
