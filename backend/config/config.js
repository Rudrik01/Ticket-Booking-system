// config.js

module.exports = {
    // Database connection string
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/event-ticket-booking',
  
    // JWT secret for user authentication
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  
    // JWT secret for password reset
    JWT_RESET_SECRET: process.env.JWT_RESET_SECRET || 'your_jwt_reset_secret',
  
    // Email configuration for nodemailer
    EMAIL_USERNAME: process.env.EMAIL_USERNAME || 'your_email_username',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'your_email_password',
  
    // Google OAuth 2.0 credentials
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'your_google_client_id',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'your_google_client_secret',
  
    // Port for the server to listen on
    PORT: process.env.PORT || 5000
  };
  