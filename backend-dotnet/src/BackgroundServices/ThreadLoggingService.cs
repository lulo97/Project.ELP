using StackExchange.Redis;
using System.Diagnostics;
using System.Threading;

/*
.NET ThreadPool has an adaptive algorithm:
- Adds threads when more requests need them
- Removes (retires) threads when idle  
-> If all task are async then thread count not changes
-> If all task are sync then thread count increasing by algorithm
*/

public class ThreadLoggingService : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var process = Process.GetCurrentProcess();

        while (!stoppingToken.IsCancellationRequested)
        {
            // Actual OS thread count
            int threadCount = process.Threads.Count;

            // Current available vs max ThreadPool worker/io threads
            ThreadPool.GetAvailableThreads(out int availableWorker, out int availableIo);
            ThreadPool.GetMaxThreads(out int maxWorker, out int maxIo);
            ThreadPool.GetMinThreads(out int minWorker, out int minIo);

            // Calculate how many are currently in use
            int usedWorker = maxWorker - availableWorker;
            int usedIo = maxIo - availableIo;

            //==== THREADPOOL LOG ====
            //OS Threads: 42
            //Worker Threads Used: 2 / 32767(min: 8)
            //IO Threads Used: 0 / 1000(min: 1)
            //========================

            Console.WriteLine(
                $"\n==== THREADPOOL LOG ====\n" +
                $"OS Threads:           {threadCount}\n" +
                $"Worker Threads Used:  {usedWorker} / {maxWorker} (min: {minWorker})\n" +
                $"IO Threads Used:      {usedIo} / {maxIo} (min: {minIo})\n" +
                $"========================\n"
            );

            await Task.Delay(60000, stoppingToken);
        }
    }
}

