using System;
using System.Collections.Generic;

namespace Models;

public partial class Meanings
{
    public string Id { get; set; } = null!;

    public string Meaning { get; set; } = null!;

    public string Word { get; set; } = null!;

    public string PartOfSpeech { get; set; } = null!;

    public string UserId { get; set; } = null!;
}
