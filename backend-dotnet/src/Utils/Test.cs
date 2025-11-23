using System;
using BCrypt.Net;

public static class Test
{
    public static void Run()
    {
        // Original password
        string password = "123";

        // Hash the password
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
        Console.WriteLine($"Password hash: {passwordHash}");

        // A hash to compare against (for example, stored in DB)
        string testHash = "$2a$12$6.BW9j78BrORKMuR4EA4duAPrwwxUZVcsOpJn4WE8W6plpslfmgi2";

        // Compare the password with the hash
        bool isMatch = BCrypt.Net.BCrypt.Verify(password, testHash);
        Console.WriteLine($"Does the password match the hash? {isMatch}");
    }
}
