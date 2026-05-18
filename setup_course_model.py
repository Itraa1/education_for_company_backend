#!/usr/bin/env python3
"""
Setup Course Model - Python version
Creates the Course content type directory structure
"""

import os
import shutil
import sys
from pathlib import Path


def setup_course_model():
    """Create Course model directory structure and copy files"""
    
    project_root = Path(__file__).parent
    base_dir = project_root / 'src' / 'api' / 'course'
    test_dir = project_root / 'src' / 'api' / 'test'
    
    print("\n" + "=" * 50)
    print("Setting up Course Model...")
    print("=" * 50 + "\n")
    
    # Create directories
    directories = [
        base_dir / 'content-types' / 'course',
        base_dir / 'controllers',
        base_dir / 'routes',
        base_dir / 'services',
    ]
    
    for directory in directories:
        directory.mkdir(parents=True, exist_ok=True)
        print(f"✓ Created directory: {directory.relative_to(project_root)}")
    
    # Copy files
    files_to_copy = [
        {
            'source': test_dir / 'content-types' / 'course-schema.json',
            'dest': base_dir / 'content-types' / 'course' / 'schema.json',
            'name': 'schema.json (Course collection type)',
        },
        {
            'source': test_dir / 'controllers' / 'course.ts',
            'dest': base_dir / 'controllers' / 'course.ts',
            'name': 'controller.ts (Course API controller)',
        },
        {
            'source': test_dir / 'routes' / 'course.ts',
            'dest': base_dir / 'routes' / 'course.ts',
            'name': 'router.ts (Course API routes)',
        },
        {
            'source': test_dir / 'services' / 'course.ts',
            'dest': base_dir / 'services' / 'course.ts',
            'name': 'service.ts (Course business logic)',
        },
    ]
    
    print("\n📋 Creating Course model files:\n")
    
    for file in files_to_copy:
        source = file['source']
        dest = file['dest']
        name = file['name']
        
        if source.exists():
            shutil.copy2(source, dest)
            print(f"✓ {name}")
            print(f"  → {dest.relative_to(project_root)}")
        else:
            print(f"⚠ Source file not found: {source.relative_to(project_root)}")
    
    print("\n" + "=" * 50)
    print("✅ Course model setup completed!")
    print("=" * 50 + "\n")
    
    print("📁 Course Model Structure:\n")
    print("   src/api/course/")
    print("   ├── content-types/")
    print("   │   └── course/")
    print("   │       └── schema.json")
    print("   ├── controllers/")
    print("   │   └── course.ts")
    print("   ├── routes/")
    print("   │   └── course.ts")
    print("   └── services/")
    print("       └── course.ts")
    print("\n")
    
    print("🚀 Next steps:")
    print("   1. npm run dev          # Start development server")
    print("   2. Open http://localhost:1337/admin")
    print("   3. Check 'Courses' in the left sidebar")
    print("\n")


if __name__ == '__main__':
    try:
        setup_course_model()
    except Exception as e:
        print(f"\n❌ Error: {e}", file=sys.stderr)
        sys.exit(1)
