using Microsoft.EntityFrameworkCore;
using Models;
using System.Data;

namespace Utils
{
    public static class DbHelper
    {
        public static async Task<List<Dictionary<string, object?>>> ExecuteQueryAsync(
            DbContextOptions<AppDbContext> options, string sql)
        {
            var output = new List<Dictionary<string, object?>>();

            // Create a new DbContext per call to prevent dispose object error when passing db object from controller to here
            using var context = new AppDbContext(options);

            using var conn = context.Database.GetDbConnection();
            await conn.OpenAsync();

            using (var setSchemaCmd = conn.CreateCommand())
            {
                setSchemaCmd.CommandText = "SET search_path TO elp;";
                await setSchemaCmd.ExecuteNonQueryAsync();
            }

            using var cmd = conn.CreateCommand();
            cmd.CommandText = sql;

            using var reader = await cmd.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                var row = new Dictionary<string, object?>();
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    row[reader.GetName(i)] = reader.GetValue(i);
                }
                output.Add(row);
            }

            return output;
        }
    }
}
