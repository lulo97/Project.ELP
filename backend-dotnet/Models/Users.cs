using System;
using System.Collections.Generic;

namespace Models;

public partial class Users
{
    public string Id { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string? Email { get; set; }

    public string PasswordHash { get; set; } = null!;

    public string? FullName { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }
}
