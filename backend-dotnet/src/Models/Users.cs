using System;
using System.Collections.Generic;

namespace Models;

public partial class users
{
    public string id { get; set; } = null!;

    public string username { get; set; } = null!;

    public string? email { get; set; }

    public string password_hash { get; set; } = null!;

    public string? full_name { get; set; }

    public bool? is_active { get; set; }

    public DateTime? created_at { get; set; }
}
