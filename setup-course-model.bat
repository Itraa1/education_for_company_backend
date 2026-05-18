@echo off
REM Setup Course Model - Manual File Organization for Windows

echo.
echo ========================================
echo Setting up Course Model structure...
echo ========================================
echo.

REM Create necessary directories
if not exist "src\api\course\content-types\course" mkdir "src\api\course\content-types\course"
if not exist "src\api\course\controllers" mkdir "src\api\course\controllers"
if not exist "src\api\course\routes" mkdir "src\api\course\routes"
if not exist "src\api\course\services" mkdir "src\api\course\services"

echo.
echo 📋 Creating course schema...
copy "src\api\test\content-types\course-schema.json" "src\api\course\content-types\course\schema.json" >nul

echo 🎮 Creating course controller...
copy "src\api\test\controllers\course.ts" "src\api\course\controllers\course.ts" >nul

echo 🛣️  Creating course router...
copy "src\api\test\routes\course.ts" "src\api\course\routes\course.ts" >nul

echo ⚙️  Creating course service...
copy "src\api\test\services\course.ts" "src\api\course\services\course.ts" >nul

echo.

REM Verify files
if exist "src\api\course\content-types\course\schema.json" (
  echo ✅ Course model files created successfully!
  echo.
  echo 📁 Structure created:
  echo    src\api\course\
  echo    ├── content-types\
  echo    │   └── course\
  echo    │       └── schema.json
  echo    ├── controllers\
  echo    │   └── course.ts
  echo    ├── routes\
  echo    │   └── course.ts
  echo    └── services\
  echo        └── course.ts
  echo.
  echo 🚀 Next steps:
  echo    1. npm run dev
  echo    2. Navigate to http://localhost:1337/admin
  echo    3. Check 'Courses' collection in the sidebar
  echo.
) else (
  echo ❌ Error creating files
  exit /b 1
)
