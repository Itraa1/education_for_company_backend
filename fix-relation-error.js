#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing relation error...\n');

// Fix course-completion schema
const schemaPath = path.join(__dirname, 'src/api/course-completion/content-types/course-completion/schema.json');

try {
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  
  // Remove inversedBy from user relation
  if (schema.attributes.user && schema.attributes.user.inversedBy) {
    console.log('✓ Removing inversedBy from user relation...');
    delete schema.attributes.user.inversedBy;
  }
  
  // Remove inversedBy from course relation
  if (schema.attributes.course && schema.attributes.course.inversedBy) {
    console.log('✓ Removing inversedBy from course relation...');
    delete schema.attributes.course.inversedBy;
  }
  
  fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
  console.log('✓ Schema fixed!\n');
  
} catch (error) {
  console.error('✗ Error:', error.message);
  process.exit(1);
}

// Clear Strapi cache
console.log('🧹 Clearing Strapi cache...\n');

const cachePath = path.join(__dirname, '.strapi');
if (fs.existsSync(cachePath)) {
  try {
    fs.rmSync(cachePath, { recursive: true });
    console.log('✓ Cache cleared!\n');
  } catch (error) {
    console.log('⚠ Could not clear cache (might be locked):\n');
  }
}

console.log('═════════════════════════════════════════════════════════════════');
console.log('\n✅ FIXES APPLIED!\n');
console.log('Now run: npm run dev\n');
console.log('═════════════════════════════════════════════════════════════════\n');
