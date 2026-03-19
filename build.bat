@echo off
REM Spa & Salon Booking System - Build Script
REM This script will build the application for production

echo ========================================
echo   Spa & Salon Booking System
echo   Production Build Script
echo ========================================
echo.

REM Check if Node.js is installed
echo [1/3] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    pause
    exit /b 1
)
echo [OK] Node.js is installed
echo.

REM Check if dependencies are installed
echo [2/3] Checking dependencies...
if not exist "node_modules\" (
    echo [ERROR] Dependencies not found!
    echo Please run 'setup.bat' first to install dependencies.
    pause
    exit /b 1
)
echo [OK] Dependencies found
echo.

REM Build the application
echo [3/3] Building application for production...
echo This may take a minute...
echo.

call npm run build

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Build failed!
    echo.
    echo Troubleshooting tips:
    echo 1. Run 'npm run lint' to check for errors
    echo 2. Check the error messages above
    echo 3. Make sure all dependencies are installed
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Build Complete!
echo ========================================
echo.
echo Production files are in the 'dist' folder
echo.
echo To preview the production build:
echo Run 'npm run preview'
echo.
echo To deploy:
echo 1. Upload the 'dist' folder to your web server
echo 2. Configure your server to serve index.html
echo 3. Set up environment variables for email service
echo.
pause
