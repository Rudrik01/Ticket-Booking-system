// generateSecrets.js

const crypto = require('crypto');

// Function to generate a secure random string
function generateSecret(length) {
  return crypto.randomBytes(length).toString('hex');
}

// Generate JWT secret
const jwtSecret = generateSecret(32); // 32 bytes (256 bits) is recommended for JWT secret
console.log(`JWT_SECRET=${jwtSecret}`);

// Generate JWT reset secret
const jwtResetSecret = generateSecret(32); // 32 bytes (256 bits) is recommended for JWT reset secret
console.log(`JWT_RESET_SECRET=${jwtResetSecret}`);
