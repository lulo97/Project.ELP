using System;
using System.Collections.Generic;

namespace Models;

public partial class writing_answers
{
    public string id { get; set; } = null!;

    public string question_id { get; set; } = null!;

    public string answer { get; set; } = null!;

    public string? review { get; set; }

    public string user_id { get; set; } = null!;
}
