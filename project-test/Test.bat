@echo off
setlocal enabledelayedexpansion

:: Create log directory if it doesn't exist
if not exist log (
    mkdir log
)

:: Get today's date in YYYYMMDD format
for /f "tokens=2-4 delims=/.- " %%a in ('echo %date%') do (
    set YYYY=%%c
    set MM=%%a
    set DD=%%b
)

set BASE=log%YYYY%%MM%%DD%

:: Find next available index
set INDEX=1
:findfile
if exist log\%BASE%_%INDEX%.log (
    set /a INDEX+=1
    goto findfile
)

:: Final log file path
set LOGFILE=log\%BASE%_%INDEX%.log

echo ==========================================
echo  Writing Jest test output to: %LOGFILE%
echo ==========================================
echo.

:: Run Jest test and redirect all output
npm test > "%LOGFILE%" 2>&1

echo Done. Log saved to %LOGFILE%
pause
