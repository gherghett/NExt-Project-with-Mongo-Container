const { execSync } = require('child_process');

try {
  const output = execSync('docker ps --filter name=homeserver-mongodb --format "{{.Names}}"', { encoding: 'utf8' });
  if (!output.includes('homeserver-mongodb')) {
  console.log('MongoDB container not running. Starting...');
  execSync('npm run mongo', { stdio: 'inherit' });
  console.log('Running Prisma migrations and seed...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  execSync('npx prisma db seed', { stdio: 'inherit' });
  } else {
  console.log('MongoDB container is already running.');
  console.log('Running Prisma migrations and seed...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  execSync('npx prisma db seed', { stdio: 'inherit' });
  }
} catch (err) {
  console.error('Error checking MongoDB container:', err);
  execSync('npm run mongo', { stdio: 'inherit' });
  console.log('Running Prisma migrations and seed...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  execSync('npx prisma db seed', { stdio: 'inherit' });
}
