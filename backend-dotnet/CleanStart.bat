@echo off
REM Configuration Variables
SET IMAGE_NAME=elp-backend-dotnet-image
SET CONTAINER_NAME=elp-backend-dotnet-container
SET HOST_PORT=3201
SET CONTAINER_PORT=3201
SET DOCKER_NETWORK=elp-network
SET ENV_FILE=.env.production

REM Run dotnet publish to /publish folder
dotnet publish ".\backend-dotnet.csproj" -c Release -o "%CD%\publish"

REM Stop and remove existing container, image
docker rm -f %CONTAINER_NAME%

docker rmi %IMAGE_NAME%

REM Build new image
docker build -t %IMAGE_NAME% .

REM =============================
REM Run container with volume and env
REM =============================
docker run -d ^
  -p %HOST_PORT%:%CONTAINER_PORT% ^
  --name %CONTAINER_NAME% ^
  --restart unless-stopped ^
  --network %DOCKER_NETWORK% ^
  --env-file %ENV_FILE% ^
  %IMAGE_NAME%

echo.
echo CleanStart finished. App should be running on http://localhost:%HOST_PORT%
pause
