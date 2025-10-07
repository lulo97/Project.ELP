@echo off
:: ==============================================
:: SQLite Database Export Script
:: ==============================================
:: Change these variables as needed
set DB_FILE=database.sqlite
set SQLITE_EXE=sqlite3.exe
set BACKUP_DIR=backup
set DATESTAMP=%date:~-4%%date:~4,2%%date:~7,2%

:: Create backup directory if not exists
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo Exporting database schema to schema.sql ...
"%SQLITE_EXE%" "%DB_FILE%" .schema > "%BACKUP_DIR%\schema.sql"

echo Exporting full database dump to backupData%DATESTAMP%.sql ...
"%SQLITE_EXE%" "%DB_FILE%" .dump > "%BACKUP_DIR%\backupData%DATESTAMP%.sql"

echo ===============================================
echo Backup complete!
echo Files saved in: %BACKUP_DIR%
echo Schema: schema.sql
echo Data dump: backupData%DATESTAMP%.sql
echo ===============================================
pause
