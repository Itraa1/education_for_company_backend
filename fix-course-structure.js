const fs = require('fs');
const path = require('path');

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║    🔧 AUTO-FIX: Creating Course model structure            ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

try {
  const baseDir = path.join(__dirname, 'src', 'api', 'course');
  const testDir = path.join(__dirname, 'src', 'api', 'test');

  // Step 1: Remove old course folder if exists
  if (fs.existsSync(baseDir)) {
    console.log('🧹 Cleaning up old course folder...');
    fs.rmSync(baseDir, { recursive: true, force: true });
    console.log('   ✓ Removed old structure\n');
  }

  // Step 2: Create fresh directories
  console.log('📁 Creating fresh directory structure...\n');
  const dirs = [
    path.join(baseDir, 'content-types', 'course'),
    path.join(baseDir, 'controllers'),
    path.join(baseDir, 'routes'),
    path.join(baseDir, 'services'),
  ];

  dirs.forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`   ✓ ${path.relative(__dirname, dir)}`);
  });

  // Step 3: Copy files with error handling
  console.log('\n📋 Copying Course files...\n');

  const files = [
    {
      src: path.join(testDir, 'content-types', 'course-schema.json'),
      dst: path.join(baseDir, 'content-types', 'course', 'schema.json'),
      name: 'Schema'
    },
    {
      src: path.join(testDir, 'controllers', 'course.ts'),
      dst: path.join(baseDir, 'controllers', 'course.ts'),
      name: 'Controller'
    },
    {
      src: path.join(testDir, 'routes', 'course.ts'),
      dst: path.join(baseDir, 'routes', 'course.ts'),
      name: 'Router'
    },
    {
      src: path.join(testDir, 'services', 'course.ts'),
      dst: path.join(baseDir, 'services', 'course.ts'),
      name: 'Service'
    },
  ];

  files.forEach(file => {
    if (!fs.existsSync(file.src)) {
      throw new Error(`Source file not found: ${file.src}`);
    }
    fs.copyFileSync(file.src, file.dst);
    console.log(`   ✓ ${file.name.padEnd(12)} → ${path.relative(__dirname, file.dst)}`);
  });

  // Step 4: Verify structure
  console.log('\n✅ Verifying structure...\n');
  let allGood = true;
  
  files.forEach(file => {
    if (fs.existsSync(file.dst)) {
      console.log(`   ✓ ${file.name}`);
    } else {
      console.log(`   ✗ ${file.name}`);
      allGood = false;
    }
  });

  if (allGood) {
    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║  ✅ SUCCESS! Course structure created and verified         ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    console.log('🚀 Now run: npm run dev\n');
    process.exit(0);
  } else {
    throw new Error('Some files could not be created');
  }

} catch (error) {
  console.error('\n❌ Error:\n');
  console.error(`   ${error.message}\n`);
  process.exit(1);
}
