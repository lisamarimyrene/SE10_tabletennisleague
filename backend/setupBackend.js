// Run npm install
const { execSync } = require('child_process');
execSync('npm install', { stdio: 'inherit' });

// Run the server script and display in console
execSync('npm run server', { stdio: 'inherit' });