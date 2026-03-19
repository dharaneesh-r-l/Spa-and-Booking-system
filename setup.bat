@echo off
REM Spa & Salon Booking System - Setup Script
REM This script will install all dependencies

echo ========================================
echo   Spa & Salon Booking System
echo   Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
echo [1/3] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Download the LTS version and run the installer.
    echo.
    echo After installation, run this script again.
    pause
    exit /b 1
)
echo [OK] Node.js is installed
node --version
npm --version
echo.

REM Ask user to choose package manager
echo [2/3] Choose package manager:
echo 1. npm (default, comes with Node.js)
echo 2. pnpm (faster, recommended)
echo.
set /p pm_choice="Enter your choice (1 or 2, default is 1): "

if "%pm_choice%"=="" set pm_choice=1
if "%pm_choice%"=="2" (
    echo.
    echo Checking if pnpm is installed...
    pnpm --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo [INFO] pnpm is not installed. Installing pnpm globally...
        call npm install -g pnpm
        if %errorlevel% neq 0 (
            echo [ERROR] Failed to install pnpm!
            echo Falling back to npm...
            set pm_choice=1
        ) else (
            echo [OK] pnpm installed successfully
        )
    ) else (
        echo [OK] pnpm is already installed
    )
)
echo.

REM Install dependencies
echo [3/3] Installing dependencies...
echo This may take a few minutes. Please wait...
echo.

if "%pm_choice%"=="2" (
    echo Using pnpm...
    call pnpm install
) else (
    echo Using npm...
    call npm install
)

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Failed to install dependencies!
    echo.
    echo Troubleshooting tips:
    echo 1. Check your internet connection
    echo 2. Try running as Administrator
    echo 3. Delete node_modules folder and try again
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run 'start.bat' to start the development server
echo    OR
echo 2. Run 'npm run dev' manually
echo.
echo The application will be available at:
echo http://localhost:5173
echo.
echo Default Admin Account:
echo Email: admin@spa.com
echo Password: admin123
echo.
echo For more information, see:
echo - README.md (full documentation)
echo - QUICKSTART.md (quick guide)
echo - EMAIL_INTEGRATION.md (email setup)
echo.
pause
