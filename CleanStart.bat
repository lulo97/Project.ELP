@echo off
REM Stop and remove container
docker rm -f elp-application-container

REM Remove image
docker rmi elp-application-image

REM Build the image
docker build -t elp-application-image .

REM Run container with SQLite volume bind
docker run -d ^
  -p 3001:3001 ^
  --name elp-application-container ^
  --restart unless-stopped ^
  elp-application-image

echo.
echo CleanStart finished. App should be running on http://localhost:3001
pause
