using System;
using System.Collections.Generic;

namespace Models;

public partial class speaking_scores
{
    public string id { get; set; } = null!;

    public string? speaking_id { get; set; }

    public decimal? score { get; set; }

    public string? text_listened { get; set; }

    public string? text { get; set; }
}
