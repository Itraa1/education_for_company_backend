const fs = require('fs');
const path = require('path');

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║   📦 Setting up Course Completion & Models                 ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

try {
  const baseDir = path.join(__dirname, 'src', 'api', 'course-completion');
  const testDir = path.join(__dirname, 'src', 'api', 'test');

  // Step 1: Create fresh directories for course-completion
  console.log('📁 Creating Course Completion directories...\n');
  
  if (fs.existsSync(baseDir)) {
    console.log('   ✓ Cleaning old directory');
    fs.rmSync(baseDir, { recursive: true, force: true });
  }

  const dirs = [
    path.join(baseDir, 'content-types', 'course-completion'),
    path.join(baseDir, 'controllers'),
    path.join(baseDir, 'routes'),
    path.join(baseDir, 'services'),
  ];

  dirs.forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
  });
  console.log('   ✓ Directories created\n');

  // Step 2: Copy course-completion files
  console.log('📋 Copying Course Completion files...\n');

  const files = [
    {
      src: path.join(testDir, 'content-types', 'course-completion-schema.json'),
      dst: path.join(baseDir, 'content-types', 'course-completion', 'schema.json'),
      name: 'Schema'
    },
    {
      src: path.join(testDir, 'controllers', 'course-completion.ts'),
      dst: path.join(baseDir, 'controllers', 'course-completion.ts'),
      name: 'Controller'
    },
    {
      src: path.join(testDir, 'routes', 'course-completion.ts'),
      dst: path.join(baseDir, 'routes', 'course-completion.ts'),
      name: 'Router'
    },
    {
      src: path.join(testDir, 'services', 'course-completion.ts'),
      dst: path.join(baseDir, 'services', 'course-completion.ts'),
      name: 'Service'
    },
  ];

  files.forEach(file => {
    if (!fs.existsSync(file.src)) {
      throw new Error(`Source file not found: ${file.src}`);
    }
    fs.copyFileSync(file.src, file.dst);
    console.log(`   ✓ ${file.name}`);
  });

  // Step 3: Verify structure
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
    console.log('║  ✅ SUCCESS! Course Completion model is ready              ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');
    
    console.log('📁 Structure created:\n');
    console.log('   src/api/course-completion/');
    console.log('   ├── content-types/course-completion/schema.json');
    console.log('   ├── controllers/course-completion.ts');
    console.log('   ├── routes/course-completion.ts');
    console.log('   └── services/course-completion.ts\n');
    
    console.log('🚀 Next steps:\n');
    console.log('   1. npm run dev');
    console.log('   2. Go to http://localhost:1337/admin');
    console.log('   3. Check "Course Completions" collection\n');

    process.exit(0);
  } else {
    throw new Error('Some files could not be created');
  }

} catch (error) {
  console.error('\n❌ Error:\n');
  console.error(`   ${error.message}\n`);
  process.exit(1);
}
