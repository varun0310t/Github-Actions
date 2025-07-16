// Basic test for the Express app
console.log('🧪 Running basic tests...');

// Test 1: Check if package.json exists
const fs = require('fs');
const path = require('path');

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
  console.log('✅ Package.json is valid JSON');
  
  // Test 2: Check if required dependencies exist
  const requiredDeps = ['express'];
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
  
  if (missingDeps.length > 0) {
    console.log('❌ Missing dependencies:', missingDeps);
    process.exit(1);
  }
  console.log('✅ All required dependencies are present');
  
  // Test 3: Check if build output exists
  const distPath = path.join(__dirname, '../dist/index.js');
  if (fs.existsSync(distPath)) {
    console.log('✅ Build output exists');
    
    // Test 4: Check if build output is valid JavaScript
    try {
      require(distPath);
      console.log('✅ Build output is valid JavaScript');
    } catch (error) {
      console.log('❌ Build output has syntax errors:', error.message);
      process.exit(1);
    }
  } else {
    console.log('⚠️  Build output not found - this is expected if not built yet');
  }
  
  console.log('🎉 All basic tests passed!');
  
} catch (error) {
  console.log('❌ Test failed:', error.message);
  process.exit(1);
}
