using System;

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
    }
}
