using System;
using System.Collections.Generic;

namespace Models;

public partial class Posts
{
    public string Id { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public string UserId { get; set; } = null!;
}
