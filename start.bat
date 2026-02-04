@echo off
echo Starting Aviation AI Platform...
echo.
echo Backend Server: http://localhost:5000
echo Frontend App: http://localhost:3000
echo.
echo Starting servers...
start "Backend Server" cmd /k "npm run server"
timeout /t 3 /nobreak > nul
start "Frontend App" cmd /k "cd client && npm start"
echo.
echo Both servers are starting...
echo Check the opened windows for status.
pause