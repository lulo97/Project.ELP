using System;
using System.Collections.Generic;

namespace Models;

public partial class writing_questions
{
    public string id { get; set; } = null!;

    public string question { get; set; } = null!;

    public string user_id { get; set; } = null!;
}
