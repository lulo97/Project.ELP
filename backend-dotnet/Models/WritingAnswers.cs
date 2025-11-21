using System;
using System.Collections.Generic;

namespace Models;

public partial class WritingAnswers
{
    public string? Id { get; set; }

    public string? QuestionId { get; set; }

    public string? Answer { get; set; }

    public string? Review { get; set; }
}
