dotnet ef dbcontext scaffold "Name=DefaultConnection" Npgsql.EntityFrameworkCore.PostgreSQL -o src/Models -c AppDbContext --no-build -f --no-pluralize --namespace Models --use-database-names
