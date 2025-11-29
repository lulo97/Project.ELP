using System.Text.RegularExpressions;

namespace Utils
{
    public static class Utils
    {
        public static string GetRandomId()
        {
            DateTime now = DateTime.Now;

            string timestamp = now.ToString("yyyyMMddHHmmss");

            Random rnd = new Random();
            string randomDigits = rnd.Next(1000, 9999).ToString();

            return timestamp + randomDigits;
        }

        public static (bool safe, string reason) IsHtmlMalicious(string html)
        {
            if (string.IsNullOrWhiteSpace(html))
            {
                return (true, "Input is empty or whitespace");
            }

            // 1. Check for <script> tags
            if (Regex.IsMatch(html, @"<\s*script\b", RegexOptions.IgnoreCase))
            {
                return (false, "<script> tag detected");
            }

            // 2. Check for <iframe>, <object>, <embed> tags
            if (Regex.IsMatch(html, @"<\s*(iframe|object|embed)\b", RegexOptions.IgnoreCase))
            {
                return (false, "Potentially dangerous tag detected (iframe, object, embed)");
            }

            // 3. Check for javascript: or data: in attributes
            if (Regex.IsMatch(html, @"(javascript:|data:)", RegexOptions.IgnoreCase))
            {
                return (false, "javascript: or data: URI detected");
            }

            // 4. Check for inline event handlers (onload, onclick, etc.)
            if (Regex.IsMatch(html, @"on\w+\s*=", RegexOptions.IgnoreCase))
            {
                return (false, "Inline event handler detected (onload, onclick, etc.)");
            }

            return (true, "HTML appears safe");
        }
    }
}
