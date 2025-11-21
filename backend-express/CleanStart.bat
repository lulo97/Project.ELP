@echo off
REM =============================
REM Configuration Variables
REM =============================
SET IMAGE_NAME=elp-backend-express-image
SET CONTAINER_NAME=elp-backend-express-container
SET HOST_PORT=3001
SET CONTAINER_PORT=3001
SET DOCKER_NETWORK=elp-network
SET ENV_FILE=.env.production

REM =============================
REM Stop and remove existing container
REM =============================
docker rm -f %CONTAINER_NAME%

REM =============================
REM Remove existing image
REM =============================
docker rmi %IMAGE_NAME%

REM =============================
REM Build new image
REM =============================
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
