dotnet ef dbcontext scaffold "Name=DefaultConnection" Npgsql.EntityFrameworkCore.PostgreSQL -o src/Models -c AppDbContext -f --no-pluralize --namespace Models
