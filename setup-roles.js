/**
 * Setup Roles and Permissions
 * Creates Author and Admin roles with proper permissions
 */

const fs = require('fs');
const path = require('path');

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║    🔐 Setting up Roles and Permissions                      ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Configuration for roles and their permissions
const rolesConfig = [
  {
    name: 'Author',
    description: 'Can create and manage their own courses',
    type: 'regular',
    permissions: [
      // Course permissions
      'api::course.course:create',
      'api::course.course:read',
      'api::course.course:update',
      // Can only update/delete own courses (handled by middleware)
      
      // Completion tracking
      'api::course-completion.course-completion:read',
      'api::course-completion.course-completion:create',
      
      // Can view user profile
      'plugin::users-permissions.user:read',
    ]
  },
  {
    name: 'Admin',
    description: 'Full system administrator with all permissions',
    type: 'admin',
    permissions: [
      // All course operations
      'api::course.course:create',
      'api::course.course:read',
      'api::course.course:update',
      'api::course.course:delete',
      
      // All completion operations
      'api::course-completion.course-completion:create',
      'api::course-completion.course-completion:read',
      'api::course-completion.course-completion:update',
      'api::course-completion.course-completion:delete',
      
      // User management
      'plugin::users-permissions.user:create',
      'plugin::users-permissions.user:read',
      'plugin::users-permissions.user:update',
      'plugin::users-permissions.user:delete',
      
      // Role management
      'plugin::users-permissions.role:create',
      'plugin::users-permissions.role:read',
      'plugin::users-permissions.role:update',
      'plugin::users-permissions.role:delete',
    ]
  }
];

// Database configuration (reads from .env)
const envPath = path.join(__dirname, '.env');
let envConfig = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envConfig[key.trim()] = value.trim();
    }
  });
}

const dbClient = envConfig.DATABASE_CLIENT || 'sqlite';
const dbInfo = {
  sqlite: 'SQLite (local dev)',
  mysql: `MySQL (${envConfig.DATABASE_HOST}:${envConfig.DATABASE_PORT})`,
  postgres: `PostgreSQL (${envConfig.DATABASE_HOST}:${envConfig.DATABASE_PORT})`
};

console.log('📋 Configuration:\n');
console.log(`   Database: ${dbInfo[dbClient] || dbClient}`);
console.log(`   Roles to create: ${rolesConfig.length}`);
console.log(`\n`);

console.log('🔐 Roles to be created:\n');
rolesConfig.forEach((role, idx) => {
  console.log(`   ${idx + 1}. ${role.name}`);
  console.log(`      Description: ${role.description}`);
  console.log(`      Permissions: ${role.permissions.length} items`);
  console.log('');
});

console.log('═══════════════════════════════════════════════════════════\n');

console.log('⚠️  IMPORTANT INSTRUCTIONS:\n');
console.log('   This script creates the role STRUCTURE and documentation.');
console.log('   To ACTUALLY CREATE the roles in your database:\n');
console.log('   1. Start Strapi: npm run dev');
console.log('   2. Go to: http://localhost:1337/admin');
console.log('   3. Navigate: Settings → Users & Permissions → Roles');
console.log('   4. Create each role with the permissions listed below\n');

console.log('═══════════════════════════════════════════════════════════\n');

// Create a configuration file for reference
const configOutput = {
  roles: rolesConfig,
  createdAt: new Date().toISOString(),
  instructions: {
    step1: 'Start Strapi with: npm run dev',
    step2: 'Access admin panel at http://localhost:1337/admin',
    step3: 'Go to Settings → Users & Permissions → Roles',
    step4: 'Create each role with the specified permissions'
  },
  notes: {
    author: 'Author role can create and manage their own courses. Restrict course:update/delete to own courses via middleware.',
    admin: 'Admin role has full access to all system resources.'
  }
};

const configPath = path.join(__dirname, '.roles-config.json');
fs.writeFileSync(configPath, JSON.stringify(configOutput, null, 2));

console.log('✅ Role configuration created!\n');
console.log('📁 Files created:\n');
console.log(`   • ${path.relative(__dirname, configPath)}`);
console.log('     └─ Reference configuration for roles and permissions\n');

// Create markdown documentation
const docContent = `# 🔐 Roles and Permissions Configuration

## Roles Structure

### 1. Author Role ✍️

**Description:** Can create and manage their own courses

**Permissions:**
${rolesConfig[0].permissions.map(p => `- ${p}`).join('\n')}

**Capabilities:**
- Create new courses
- View all courses
- Update their own courses
- Track course completions

**Restrictions:**
- Cannot delete courses (only admin)
- Cannot update/delete other authors' courses

---

### 2. Admin Role 🔧

**Description:** Full system administrator

**Permissions:**
${rolesConfig[1].permissions.map(p => `- ${p}`).join('\n')}

**Capabilities:**
- Full CRUD on all resources
- Manage users and roles
- Manage all courses
- View all completions

---

## How to Set Up

### Step 1: Start Strapi
\`\`\`bash
npm run dev
\`\`\`

### Step 2: Access Admin Panel
Go to: \`http://localhost:1337/admin\`

### Step 3: Navigate to Roles
Settings → Users & Permissions → Roles

### Step 4: Create Author Role
1. Click "Create new role"
2. Enter name: \`Author\`
3. Enter description: \`Can create and manage their own courses\`
4. Select permissions from the list above
5. Save

### Step 5: Create Admin Role
1. Click "Create new role"
2. Enter name: \`Admin\`
3. Enter description: \`Full system administrator with all permissions\`
4. Select all permissions
5. Save

---

## How Roles Work

1. **Role Assignment:** Assign roles to users in Users section
2. **Permissions Check:** Strapi checks user roles before allowing actions
3. **Multiple Roles:** Users can have multiple roles
4. **Default Roles:** \`Authenticated\` and \`Public\` are always available

---

## API Examples

### Create a course (Author or Admin)
\`\`\`bash
curl -X POST http://localhost:1337/api/courses \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -d '{
    "data": {
      "title": "My Course",
      "description": "<p>Course description</p>",
      "category": "programming",
      "level": "beginner",
      "duration": 600,
      "instructor": "John Doe"
    }
  }'
\`\`\`

### Track course completion
\`\`\`bash
curl -X POST http://localhost:1337/api/course-completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -d '{
    "data": {
      "user": 1,
      "course": 1,
      "progress": 100,
      "completedAt": "2026-05-17T23:00:00Z"
    }
  }'
\`\`\`

### Get user's course completions
\`\`\`bash
curl "http://localhost:1337/api/course-completions?filters[user][id][$eq]=1" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
\`\`\`

---

## Important Notes

- **Author Restriction:** To prevent authors from editing others' courses, implement a middleware check
- **Permissions Update:** After creating roles, they'll appear in the admin panel
- **Database:** Roles are stored in \`users_permissions_role\` table
- **JWT Token:** Include token in \`Authorization: Bearer\` header for authenticated requests
`;

const docPath = path.join(__dirname, 'ROLES_SETUP.md');
fs.writeFileSync(docPath, docContent);

console.log(`   • ${path.relative(__dirname, docPath)}`);
console.log('     └─ Detailed documentation for roles setup\n');

console.log('═══════════════════════════════════════════════════════════\n');

console.log('🚀 NEXT STEPS:\n');
console.log('   1. npm run dev');
console.log('   2. Open http://localhost:1337/admin');
console.log('   3. Settings → Users & Permissions → Roles');
console.log('   4. Create Author and Admin roles with permissions above\n');

console.log('✨ Documentation:\n');
console.log('   See ROLES_SETUP.md for detailed instructions\n');

process.exit(0);
