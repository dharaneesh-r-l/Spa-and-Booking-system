@echo off
REM Spa & Salon Booking System - Quick Start Script
REM This script will check dependencies and start the development server

echo ========================================
echo   Spa & Salon Booking System
echo   Quick Start Script
echo ========================================
echo.

REM Check if Node.js is installed
echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version and run the installer.
    echo.
    pause
    exit /b 1
)
echo [OK] Node.js is installed
node --version
echo.

REM Check if node_modules exists
echo [2/4] Checking dependencies...
if not exist "node_modules\" (
    echo [INFO] Dependencies not found. Installing...
    echo This may take a few minutes...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies!
        echo.
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed successfully
) else (
    echo [OK] Dependencies already installed
)
echo.

REM Check if port 5173 is available
echo [3/4] Checking if port 5173 is available...
netstat -ano | findstr :5173 >nul 2>&1
if %errorlevel% equ 0 (
    echo [WARNING] Port 5173 is already in use!
    echo.
    echo Do you want to kill the process and continue? (Y/N)
    set /p choice=
    if /i "%choice%"=="Y" (
        for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do (
            taskkill /PID %%a /F >nul 2>&1
        )
        echo [OK] Port cleared
    ) else (
        echo [INFO] Please close the application using port 5173 and try again
        pause
        exit /b 1
    )
) else (
    echo [OK] Port 5173 is available
)
echo.

REM Start the development server
echo [4/4] Starting development server...
echo.
echo ========================================
echo   Server is starting...
echo   Please wait for the browser to open
echo ========================================
echo.
echo Application will be available at:
echo http://localhost:5173
echo.
echo Default Admin Account:
echo Email: admin@spa.com
echo Password: admin123
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Start the dev server
call npm run dev

REM If server stops
echo.
echo ========================================
echo   Server stopped
echo ========================================
pause
