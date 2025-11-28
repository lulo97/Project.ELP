FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app

COPY ./publish ./

EXPOSE 3201

ENTRYPOINT ["dotnet", "backend-dotnet.dll"]
