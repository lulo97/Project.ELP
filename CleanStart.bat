@echo off
REM Stop and remove container
docker rm -f word-collection-container

REM Remove image
docker rmi word-collection-image

REM Build the image
docker build -t word-collection-image .

REM Run container with SQLite volume bind
docker run -d ^
  -p 3000:3000 ^
  --name word-collection-container ^
  -v C:/Users/admin/Desktop/ExpressReactSamePort/database/database.sqlite:/app/database/database.sqlite ^
  word-collection-image

echo.
echo CleanStart finished. App should be running on http://localhost:3000
pause
