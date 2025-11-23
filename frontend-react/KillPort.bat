@echo off
REM Find the process using port 3100
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3100') do (
    echo Killing process with PID %%a using port 3100
    taskkill /PID %%a /F
)
pause
