using System;
using System.Collections.Generic;

namespace Models;

public partial class Examples
{
    public string Id { get; set; } = null!;

    public string Word { get; set; } = null!;

    public string PartOfSpeech { get; set; } = null!;

    public string Example { get; set; } = null!;

    public string UserId { get; set; } = null!;
}
