using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Models;
using StackExchange.Redis;

public class RedisService
{
    private readonly IConnectionMultiplexer _redis;
    private readonly AppDbContext _appDbContext;

    public RedisService(IConnectionMultiplexer redis, AppDbContext appDbContext)
    {
        _redis = redis;
        _appDbContext = appDbContext;
    }

    public async Task InitAsync()
    {
        var constsRows = await _appDbContext.Consts
            .AsNoTracking() //Remove cache select query result
            .Where(row => row.Visible == false)
            .ToListAsync();

        var db = _redis.GetDatabase(0);
        var server = _redis.GetServer(_redis.GetEndPoints().First());

        long keyCountBefore = server.DatabaseSize(db.Database);
        Console.WriteLine($"Keys before flush: {keyCountBefore}");

        await db.ExecuteAsync("FLUSHDB");

        long keyCountAfter = server.DatabaseSize(db.Database);
        Console.WriteLine($"Keys after flush: {keyCountAfter}");

        if (keyCountAfter != 0)
            throw new Exception("Redis flush failed: keys remain after FLUSHDB!");

        var jsonData = JsonSerializer.Serialize(constsRows);

        await db.StringSetAsync("CONSTS", jsonData);

        Console.WriteLine("Redis initialized with CONSTS.");
    }

    public async Task<string?> Get(string key)
    {
        var db = _redis.GetDatabase();
        return await db.StringGetAsync(key);
    }

    public override string ToString()
    {
        if (_redis == null || !_redis.IsConnected)
            return "RedisService: Not connected";

        var endpointsInfo = _redis.GetEndPoints()
            .Select(ep =>
            {
                var server = _redis.GetServer(ep);
                return $"{ep} (Connected: {server.IsConnected}, Role: {server.ServerType}, Version: {server.Version})";
            });

        return $"RedisService: Multiplexer connected: {_redis.IsConnected}, Databases: {_redis.GetDatabase().Database}, Endpoints: [{string.Join(", ", endpointsInfo)}]";
    }
}
