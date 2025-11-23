using System;
using System.Collections.Generic;

namespace Models;

public partial class examples
{
    public string id { get; set; } = null!;

    public string word { get; set; } = null!;

    public string part_of_speech { get; set; } = null!;

    public string example { get; set; } = null!;

    public string user_id { get; set; } = null!;
}
