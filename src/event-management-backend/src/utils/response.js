class ApiResponse {
  static success(res, data, message = "Success", statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res, message = "error", statusCode = 500, errors = null) {
    return res.status(statusCode).json({
      sucesss: false,
      message,
      errors,
    });
  }
}

module.exports = ApiResponse;
