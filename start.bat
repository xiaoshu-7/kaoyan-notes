@echo off
cd /d "%~dp0"
echo.
echo   Starting local server for the notes site...
echo.
start "notes-server" /min cmd /c "node server.js"
timeout /t 2 >nul
start "" http://localhost:8080/
echo   Browser opened at http://localhost:8080/
echo   Close the minimized "notes-server" window to stop.
echo.
timeout /t 3 >nul
