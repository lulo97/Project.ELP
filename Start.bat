@echo off
REM Build the image (optional if image already exists)
docker build -t word-collection-image .

REM Run container with SQLite volume bind
docker run -d ^
  -p 3000:3000 ^
  --name word-collection-container ^
  -v C:/Users/admin/Desktop/ExpressReactSamePort/database/database.sqlite:/app/database/database.sqlite ^
  word-collection-image

echo.
echo Start finished. App should be running on http://localhost:3000
pause
