const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  mongoUri:
    process.env.MONGODB_URI || "mongodb://localhost:27017/event-management",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  logLevel: process.env.LOG_LEVEL || "info",
};
module.exports = config;
