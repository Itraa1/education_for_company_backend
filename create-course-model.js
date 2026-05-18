const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'api', 'course');

// Create directories
const dirs = [
  path.join(baseDir, 'content-types', 'course'),
  path.join(baseDir, 'controllers'),
  path.join(baseDir, 'routes'),
  path.join(baseDir, 'services'),
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  }
});

// Create schema.json
const schemaPath = path.join(baseDir, 'content-types', 'course', 'schema.json');
const schema = {
  kind: 'collectionType',
  collectionName: 'courses',
  info: {
    singularName: 'course',
    pluralName: 'courses',
    displayName: 'Course',
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {},
  attributes: {
    title: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 255,
    },
    slug: {
      type: 'uid',
      targetField: 'title',
      required: true,
    },
    description: {
      type: 'richtext',
      required: true,
    },
    category: {
      type: 'enumeration',
      enum: ['programming', 'design', 'business', 'marketing', 'management', 'soft-skills', 'other'],
      required: true,
    },
    level: {
      type: 'enumeration',
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    duration: {
      type: 'integer',
      required: true,
      description: 'Duration in minutes',
    },
    instructor: {
      type: 'string',
      required: true,
      maxLength: 255,
    },
  },
};

fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2));
console.log(`✓ Created: ${schemaPath}`);

// Create controller
const controllerPath = path.join(baseDir, 'controllers', 'course.ts');
const controllerContent = `/**
 * course controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::course.course');
`;
fs.writeFileSync(controllerPath, controllerContent);
console.log(`✓ Created: ${controllerPath}`);

// Create router
const routerPath = path.join(baseDir, 'routes', 'course.ts');
const routerContent = `/**
 * course router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::course.course');
`;
fs.writeFileSync(routerPath, routerContent);
console.log(`✓ Created: ${routerPath}`);

// Create service
const servicePath = path.join(baseDir, 'services', 'course.ts');
const serviceContent = `/**
 * course service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::course.course');
`;
fs.writeFileSync(servicePath, serviceContent);
console.log(`✓ Created: ${servicePath}`);

console.log('\n✅ Course model created successfully!');
