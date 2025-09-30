@echo off
echo Starting Hexon_ Project...
echo.

REM Change to the project directory
cd /d "%~dp0"

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

REM Check if package.json exists
if not exist "package.json" (
    echo Error: package.json not found!
    echo Make sure you're in the correct project directory.
    pause
    exit /b 1
)

REM Start the development server
echo Starting development server...
echo The project will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev

REM Keep the window open if there's an error
if errorlevel 1 (
    echo.
    echo An error occurred while starting the project.
    pause
)