const mongoose = require("mongoose");
const config = require("./config");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to the database");
  } catch (error) {
    logger.error("Error connecting to the database: %o", error);
    process.exit(1);
  }
};

module.exports = connectDB;
