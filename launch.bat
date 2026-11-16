@echo off
rem ------------------------------------------------------------
rem  Kaoyan Notes - one click launcher
rem  1) start local server in background (no window)
rem  2) open http://localhost:8080
rem  Stop: end node.exe in Task Manager, or reboot.
rem ------------------------------------------------------------

set "APP=D:\A_project\workbuddy\2026-11-16-17-40-21\notes-app"

set "NODE=node"
where node >nul 2>&1
if errorlevel 1 set "NODE=C:\Users\26364\.workbuddy\binaries\node\versions\22.22.2-6\node.exe"

powershell -NoProfile -WindowStyle Hidden -Command "Start-Process -FilePath '%NODE%' -ArgumentList 'server.js' -WorkingDirectory '%APP%' -WindowStyle Hidden" >nul 2>&1

ping -n 2 127.0.0.1 >nul

start "" "http://localhost:8080/"

exit
