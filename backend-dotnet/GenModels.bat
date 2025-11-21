dotnet ef dbcontext scaffold "Name=DefaultConnection" Npgsql.EntityFrameworkCore.PostgreSQL -o Models -c AppDbContext -f --no-pluralize --namespace Models
