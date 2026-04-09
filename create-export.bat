@echo off
setlocal enabledelayedexpansion

echo.
echo ========================================================
echo   IBM Partner Portal - Export Package Creator
echo ========================================================
echo.

cd /d "%~dp0"

echo Step 1/4: Building production version...
echo.
call npm run build

if errorlevel 1 (
    echo.
    echo ❌ Build failed! Please fix errors and try again.
    pause
    exit /b 1
)

echo.
echo ✅ Build complete!
echo.

echo Step 2/4: Creating export package...
echo.

if exist "..\ibm-partner-portal-export" rmdir /s /q "..\ibm-partner-portal-export"
mkdir "..\ibm-partner-portal-export"
xcopy /E /I /Q build "..\ibm-partner-portal-export\build"
if exist "README.md" copy /Y "README.md" "..\ibm-partner-portal-export\" >nul
if exist "QUICKSTART.md" copy /Y "QUICKSTART.md" "..\ibm-partner-portal-export\" >nul
if exist "FREE_DEPLOYMENT_GUIDE.md" copy /Y "FREE_DEPLOYMENT_GUIDE.md" "..\ibm-partner-portal-export\" >nul
if exist "EXPORT_GUIDE.md" copy /Y "EXPORT_GUIDE.md" "..\ibm-partner-portal-export\" >nul

echo Creating viewing instructions...
(
echo ═══════════════════════════════════════════════════════════
echo   IBM PARTNER PORTAL - VIEWING INSTRUCTIONS
echo ═══════════════════════════════════════════════════════════
echo.
echo 🚀 QUICK START ^(Recommended^):
echo.
echo 1. Open Command Prompt or PowerShell
echo 2. Navigate to the 'build' folder:
echo    cd build
echo.
echo 3. Start a local server:
echo.
echo    Option A - Python ^(if installed^):
echo    python -m http.server 8000
echo.
echo    Option B - Node.js:
echo    npx serve -s . -p 8000
echo.
echo 4. Open your browser to:
echo    http://localhost:8000
echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo 📱 ALTERNATIVE VIEWING METHODS:
echo.
echo VS Code:
echo 1. Open the 'build' folder in VS Code
echo 2. Install "Live Server" extension
echo 3. Right-click index.html → "Open with Live Server"
echo.
echo Netlify Drop ^(Instant Online^):
echo 1. Visit: https://app.netlify.com/drop
echo 2. Drag and drop the 'build' folder
echo 3. Get instant live URL to share
echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo 📚 DOCUMENTATION:
echo.
echo - README.md - Complete documentation
echo - QUICKSTART.md - Quick start guide
echo - FREE_DEPLOYMENT_GUIDE.md - Free hosting options
echo - EXPORT_GUIDE.md - Detailed export instructions
echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo ✨ FEATURES INCLUDED:
echo.
echo ✅ IBM Carbon Design System styling
echo ✅ 20+ partner news articles covering all IBM brands
echo ✅ Featured events and videos
echo ✅ Customer success stories with metrics
echo ✅ Partner resource links ^(60+ resources^)
echo ✅ Real-time search functionality
echo ✅ Responsive design ^(mobile, tablet, desktop^)
echo ✅ Stats dashboard
echo ✅ Upcoming events calendar
echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo ❓ TROUBLESHOOTING:
echo.
echo Can't start server?
echo - Ensure Python is installed: python --version
echo - Or install Node.js from: https://nodejs.org
echo.
echo Site not loading?
echo - Make sure you're in the 'build' folder
echo - Check if port 8000 is already in use
echo - Try a different port: python -m http.server 3000
echo.
echo Need help?
echo - Check EXPORT_GUIDE.md for detailed instructions
echo - See README.md for full documentation
echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo Built with ❤️ using IBM Carbon Design System
) > "..\ibm-partner-portal-export\VIEW_INSTRUCTIONS.txt"

echo ✅ Export package created!
echo.

echo Step 3/4: Creating zip file...
echo.

cd ..

for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
set ZIP_NAME=ibm-partner-portal-export-%mydate%.zip

if exist "%ZIP_NAME%" del /f /q "%ZIP_NAME%"

powershell -command "Compress-Archive -Path 'ibm-partner-portal-export\*' -DestinationPath '%ZIP_NAME%' -Force"

if errorlevel 1 (
    echo ❌ Failed to create zip file
    pause
    exit /b 1
)

echo ✅ Zip file created!
echo.

for %%A in ("%ZIP_NAME%") do set SIZE=%%~zA
set /a SIZE_MB=!SIZE! / 1048576

echo.
echo ========================================================
echo   Step 4/4: Export Summary
echo ========================================================
echo.
echo ✅ Export Complete!
echo.
echo 📦 File: %ZIP_NAME%
echo 📊 Size: ~!SIZE_MB! MB
echo 📍 Location: %CD%\%ZIP_NAME%
echo.
echo ========================================================
echo.
echo 🎉 Ready to share with your colleagues!
echo.
echo 📧 Sharing Options:
echo    • Email the zip file ^(if under 10MB^)
echo    • Upload to Google Drive / OneDrive / Dropbox
echo    • Share via company file server
echo    • Deploy to free hosting ^(see FREE_DEPLOYMENT_GUIDE.md^)
echo.
echo 📝 Don't forget to include VIEW_INSTRUCTIONS.txt!
echo.
echo ========================================================
echo.
pause

@REM Made with Bob
