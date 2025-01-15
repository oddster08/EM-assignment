const ApiResponse = require("../utils/response");

class ValidationMiddleware {
  static validateSchema(schema) {
    return (req, res, next) => {
      try {
        const { error } = schema.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (error) {
          const errors = error.details.map((detail) => ({
            field: detail.path[0],
            message: detail.message,
          }));

          return ApiResponse.error(res, "Validation Error", 400, errors);
        }

        next();
      } catch (err) {
        return ApiResponse.error(res, "Validation middleware error", 500);
      }
    };
  }
}

module.exports = ValidationMiddleware;
