using System;
using System.Collections.Generic;

namespace Models;

public partial class SpeakingScores
{
    public string? Id { get; set; }

    public string? SpeakingId { get; set; }

    public decimal? Score { get; set; }

    public string? TextListened { get; set; }

    public string? Text { get; set; }
}
