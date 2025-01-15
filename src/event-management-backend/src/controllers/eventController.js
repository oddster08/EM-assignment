const eventService = require("../services/eventService");
const ApiResponse = require("../utils/response");
const QueryUtils = require("../utils/queryUtils");

class EventController {
  async getEvents(req, res, next) {
    try {
      const { page, limit } = QueryUtils.validatePaginationParams(
        req.query.page,
        req.query.limit
      );

      const { sortBy, sortOrder } = QueryUtils.validateSortParams(
        req.query.sortBy,
        req.query.sortOrder
      );

      const { status, search } = req.query;

      const result = await eventService.getEvents({
        page,
        limit,
        sortBy,
        sortOrder,
        status,
        search,
      });

      return ApiResponse.success(res, result, "Events retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async getEventById(req, res, next) {
    try {
      const event = await eventService.getEventById(req.params.id);

      if (!event) {
        return ApiResponse.error(res, "Event not found", 404);
      }

      return ApiResponse.success(res, event, "Event retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  async createEvent(req, res, next) {
    try {
      const event = await eventService.createEvent(req.body);
      return ApiResponse.success(res, event, "Event created successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  async updateEvent(req, res, next) {
    try {
      const event = await eventService.updateEvent(req.params.id, req.body);

      return ApiResponse.success(res, event, "Event updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteEvent(req, res, next) {
    try {
      await eventService.deleteEvent(req.params.id);
      return ApiResponse.success(res, null, "Event deleted successfully");
    } catch (error) {
      next(error);
    }
  }

  async getAnalytics(req, res, next) {
    try {
      const analytics = await eventService.getAnalytics();
      return ApiResponse.success(
        res,
        analytics,
        "Analytics retrieved successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EventController();
