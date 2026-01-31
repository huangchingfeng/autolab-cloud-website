#!/usr/bin/env node
/**
 * Build script to bundle the API for Vercel serverless
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building API bundle...');

// Create the API entry point that will be bundled
const apiEntry = `
import { createApp } from '../server/_core/app';
const app = createApp();
module.exports = app;
`;

// Write temporary entry file
const tempEntry = path.join(__dirname, '../.api-entry.ts');
fs.writeFileSync(tempEntry, apiEntry);

// Bundle using esbuild
try {
  execSync(`npx esbuild .api-entry.ts --bundle --platform=node --target=node18 --format=cjs --outfile=api/index.js --external:@neondatabase/serverless`, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log('API bundle created successfully!');
} catch (error) {
  console.error('Failed to build API:', error);
  process.exit(1);
} finally {
  // Clean up temp file
  if (fs.existsSync(tempEntry)) {
    fs.unlinkSync(tempEntry);
  }
}
