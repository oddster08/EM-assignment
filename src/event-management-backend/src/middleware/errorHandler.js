const logger = require("../utils/logger");
const ApiResponse = require("../utils/response");

const erroHandler = (err, req, res, next) => {
  logger.log(err.stack);

  if (err.name === "ValidationError") {
    return ApiResponse.error(res, "Validation Error", 400, err.errors);
  }

  return ApiResponse.error(
    res,
    err.message || "Internal Server Error",
    err.status || 500
  );
};

module.exports = erroHandler;
