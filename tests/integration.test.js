// Integration test for the Express app
const http = require('http');

console.log('🧪 Running integration tests...');

// Function to make HTTP requests
function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: data,
          headers: res.headers
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

// Test endpoints
async function runTests() {
  const baseUrl = 'http://localhost:3000';
  
  try {
    // Test 1: Root endpoint
    console.log('Testing root endpoint...');
    const rootResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    });
    
    if (rootResponse.statusCode === 200) {
      console.log('✅ Root endpoint test passed');
    } else {
      console.log('❌ Root endpoint test failed:', rootResponse.statusCode);
      process.exit(1);
    }
    
    // Test 2: Health endpoint
    console.log('Testing health endpoint...');
    const healthResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/health',
      method: 'GET'
    });
    
    if (healthResponse.statusCode === 200) {
      console.log('✅ Health endpoint test passed');
    } else {
      console.log('❌ Health endpoint test failed:', healthResponse.statusCode);
      process.exit(1);
    }
    
    // Test 3: Users endpoint
    console.log('Testing users endpoint...');
    const usersResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/users',
      method: 'GET'
    });
    
    if (usersResponse.statusCode === 200) {
      const users = JSON.parse(usersResponse.data);
      if (users.success && Array.isArray(users.data)) {
        console.log('✅ Users endpoint test passed');
      } else {
        console.log('❌ Users endpoint returned invalid data');
        process.exit(1);
      }
    } else {
      console.log('❌ Users endpoint test failed:', usersResponse.statusCode);
      process.exit(1);
    }
    
    // Test 4: 404 handling
    console.log('Testing 404 handling...');
    const notFoundResponse = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/nonexistent',
      method: 'GET'
    });
    
    if (notFoundResponse.statusCode === 404) {
      console.log('✅ 404 handling test passed');
    } else {
      console.log('❌ 404 handling test failed:', notFoundResponse.statusCode);
      process.exit(1);
    }
    
    console.log('🎉 All integration tests passed!');
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('⚠️  Server not running - integration tests skipped');
      console.log('   Start the server with "npm run dev" to run integration tests');
    } else {
      console.log('❌ Integration test failed:', error.message);
      process.exit(1);
    }
  }
}

runTests();
