#!/bin/bash
# Setup Course Model - Manual File Organization

echo "🔄 Setting up Course Model structure..."

# Create necessary directories
mkdir -p src/api/course/content-types/course
mkdir -p src/api/course/controllers
mkdir -p src/api/course/routes  
mkdir -p src/api/course/services

# Copy files from test folder to course folder
echo "📋 Creating course schema..."
cp src/api/test/content-types/course-schema.json src/api/course/content-types/course/schema.json

echo "🎮 Creating course controller..."
cp src/api/test/controllers/course.ts src/api/course/controllers/course.ts

echo "🛣️  Creating course router..."
cp src/api/test/routes/course.ts src/api/course/routes/course.ts

echo "⚙️  Creating course service..."
cp src/api/test/services/course.ts src/api/course/services/course.ts

# Verify files
if [ -f "src/api/course/content-types/course/schema.json" ]; then
  echo "✅ Course model files created successfully!"
  echo ""
  echo "📁 Structure:"
  tree src/api/course -L 3
  echo ""
  echo "🚀 Next steps:"
  echo "1. npm run dev"
  echo "2. Navigate to http://localhost:1337/admin"
  echo "3. Check 'Courses' collection in the sidebar"
else
  echo "❌ Error creating files"
  exit 1
fi
