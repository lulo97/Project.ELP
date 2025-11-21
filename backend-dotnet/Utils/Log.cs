using System;
using System.IO;
using System.Text.Json;

public static class Log
{
    private static readonly string _filePath = "log.log";
    private static readonly object _lock = new object(); // ensure thread-safety

    public static void Write(object obj, string level = "INFO")
    {
        if (obj == null) obj = "null";

        // Convert object to string
        string message;
        try
        {
            message = obj is string str ? str : JsonSerializer.Serialize(obj, new JsonSerializerOptions { WriteIndented = false });
        }
        catch
        {
            message = obj.ToString() ?? "Unknown object";
        }

        string logLine = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] {level.ToUpper()} {message}{Environment.NewLine}";

        // Thread-safe append
        lock (_lock)
        {
            File.AppendAllText(_filePath, logLine);
        }
    }
}
