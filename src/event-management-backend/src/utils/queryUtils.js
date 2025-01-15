class QueryUtils {
  static validatePaginationParams(page, limit) {
    return {
      page: Math.max(1, parseInt(page) || 1),
      limit: Math.min(100, Math.max(1, parseInt(limit) || 10)),
    };
  }

  static validateSortParams(sortBy, sortOrder) {
    const allowedSortFields = ["name", "dateTime", "status", "location"];
    const allowedSortOrders = ["asc", "desc"];

    return {
      sortBy: allowedSortFields.includes(sortBy) ? sortBy : "dateTime",
      sortOrder: allowedSortOrders.includes(sortOrder?.toLowerCase())
        ? sortOrder.toLowerCase()
        : "asc",
    };
  }
}

module.exports = QueryUtils;
