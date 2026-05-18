const fs = require('fs');
const path = require('path');

/**
 * Setup Course Model - Improved Version
 * Creates the Course content type directory structure with validation
 */

function setupCourseModel() {
  const baseDir = path.join(__dirname, 'src', 'api', 'course');
  const testDir = path.join(__dirname, 'src', 'api', 'test');
  
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║        🎓 Setting up Course Model Structure                ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  try {
    // Step 1: Create directories
    console.log('📁 Step 1: Creating directories...\n');
    
    const directories = [
      path.join(baseDir, 'content-types', 'course'),
      path.join(baseDir, 'controllers'),
      path.join(baseDir, 'routes'),
      path.join(baseDir, 'services'),
    ];

    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`   ✓ ${path.relative(__dirname, dir)}`);
      } else {
        console.log(`   ℹ ${path.relative(__dirname, dir)} (already exists)`);
      }
    });

    // Step 2: Copy files
    console.log('\n📋 Step 2: Copying files...\n');
    
    const files = [
      {
        source: path.join(testDir, 'content-types', 'course-schema.json'),
        dest: path.join(baseDir, 'content-types', 'course', 'schema.json'),
        name: 'schema.json',
        type: 'Schema Definition'
      },
      {
        source: path.join(testDir, 'controllers', 'course.ts'),
        dest: path.join(baseDir, 'controllers', 'course.ts'),
        name: 'course.ts',
        type: 'Controller'
      },
      {
        source: path.join(testDir, 'routes', 'course.ts'),
        dest: path.join(baseDir, 'routes', 'course.ts'),
        name: 'course.ts',
        type: 'Router'
      },
      {
        source: path.join(testDir, 'services', 'course.ts'),
        dest: path.join(baseDir, 'services', 'course.ts'),
        name: 'course.ts',
        type: 'Service'
      },
    ];

    let successCount = 0;
    let skipCount = 0;

    files.forEach(file => {
      if (fs.existsSync(file.source)) {
        if (fs.existsSync(file.dest)) {
          console.log(`   ℹ ${file.type.padEnd(15)} → ${path.relative(__dirname, file.dest)} (skipped - exists)`);
          skipCount++;
        } else {
          fs.copyFileSync(file.source, file.dest);
          console.log(`   ✓ ${file.type.padEnd(15)} → ${path.relative(__dirname, file.dest)}`);
          successCount++;
        }
      } else {
        console.warn(`   ✗ Source not found: ${path.relative(__dirname, file.source)}`);
      }
    });

    // Step 3: Verify structure
    console.log('\n✅ Step 3: Verification\n');
    
    const requiredFiles = [
      path.join(baseDir, 'content-types', 'course', 'schema.json'),
      path.join(baseDir, 'controllers', 'course.ts'),
      path.join(baseDir, 'routes', 'course.ts'),
      path.join(baseDir, 'services', 'course.ts'),
    ];

    let allFilesExist = true;
    requiredFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`   ✓ ${path.relative(__dirname, file)}`);
      } else {
        console.log(`   ✗ ${path.relative(__dirname, file)}`);
        allFilesExist = false;
      }
    });

    if (allFilesExist && successCount > 0) {
      console.log('\n╔════════════════════════════════════════════════════════════╗');
      console.log('║     ✅ SUCCESS! Course model setup completed!               ║');
      console.log('╚════════════════════════════════════════════════════════════╝\n');
      
      console.log('📁 Final Structure:\n');
      console.log('   src/api/course/');
      console.log('   ├── content-types/');
      console.log('   │   └── course/');
      console.log('   │       └── schema.json');
      console.log('   ├── controllers/');
      console.log('   │   └── course.ts');
      console.log('   ├── routes/');
      console.log('   │   └── course.ts');
      console.log('   └── services/');
      console.log('       └── course.ts\n');
      
      console.log('🚀 Next steps:\n');
      console.log('   1. npm run dev');
      console.log('   2. Open http://localhost:1337/admin');
      console.log('   3. Check "Courses" in the sidebar\n');
      
      process.exit(0);
    } else if (fs.existsSync(path.join(baseDir, 'content-types', 'course', 'schema.json'))) {
      console.log('\n⚠️  Course model already set up. No changes needed.\n');
      console.log('✅ Structure is valid. Ready to use!\n');
      console.log('🚀 Run: npm run dev\n');
      process.exit(0);
    } else {
      throw new Error('Setup incomplete. Some files are missing.');
    }
  } catch (error) {
    console.error('\n❌ Error during setup:\n');
    console.error(`   ${error.message}\n`);
    process.exit(1);
  }
}

// Run setup
if (require.main === module) {
  setupCourseModel();
}

module.exports = setupCourseModel;
