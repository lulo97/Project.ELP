@echo off

REM --- 1. Set environment variables ---
set POSTGRESQL_HOST=localhost
set POSTGRESQL_PORT=5432
set POSTGRESQL_DATABASE=mydb
set POSTGRESQL_USER=admin
set POSTGRESQL_PASSWORD=admin123

REM --- 2. Build PostgreSQL connection string ---
set "PG_CONN=Host=%POSTGRESQL_HOST%;Port=%POSTGRESQL_PORT%;Database=%POSTGRESQL_DATABASE%;Username=%POSTGRESQL_USER%;Password=%POSTGRESQL_PASSWORD%"

echo Using PostgreSQL connection string:
echo %PG_CONN%

REM --- 3. Scaffold DbContext using EF Core ---
dotnet ef dbcontext scaffold "%PG_CONN%" Npgsql.EntityFrameworkCore.PostgreSQL ^
    -o src/Models ^
    -c AppDbContext ^
    --no-build ^
    -f ^
    --no-pluralize ^
    --namespace Models ^
    --use-database-names ^
    --no-onconfiguring

REM --- 4. Done ---
echo.
echo Scaffold completed!
pause
