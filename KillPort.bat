@echo off
REM Find the process using port 3000
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do (
    echo Killing process with PID %%a using port 3000
    taskkill /PID %%a /F
)
pause
