const { execSync } = require('child_process');

try {
  const output = execSync('docker ps --filter name=homeserver-mongodb --format "{{.Names}}"', { encoding: 'utf8' });
  if (!output.includes('homeserver-mongodb')) {
    console.log('MongoDB container not running. Starting...');
    execSync('npm run mongo', { stdio: 'inherit' });
  } else {
    console.log('MongoDB container is already running.');
  }
} catch (err) {
  console.error('Error checking MongoDB container:', err);
  execSync('npm run mongo', { stdio: 'inherit' });
}
