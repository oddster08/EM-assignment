const Event = require("../models/Event");

class EventService {
  async getEvents({
    page = 1,
    limit = 10,
    sortBy = "dateTime",
    sortOrder = "asc",
    status,
    search,
  }) {
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const sort = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    try {
      const events = await Event.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();

      const total = await Event.countDocuments(query);

      return {
        events,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new Error(`Error fetching events: ${error.message}`);
    }
  }

  async getEventById(eventId) {
    try {
      const event = await Event.findById(eventId).lean();

      if (!event) {
        throw new Error("Event not found");
      }

      return event;
    } catch (error) {
      throw new Error(`Error fetching event by ID: ${error.message}`);
    }
  }

  async getAnalytics() {
    try {
      const analytics = await Event.aggregate([
        {
          $facet: {
            // Total events count
            totalEvents: [{ $count: "count" }],
            // Status breakdown
            statusBreakdown: [
              {
                $group: {
                  _id: "$status",
                  count: { $sum: 1 },
                },
              },
            ],
            // Next upcoming event
            nextUpcoming: [
              {
                $match: {
                  status: "Upcoming",
                  dateTime: { $gte: new Date() },
                },
              },
              { $sort: { dateTime: 1 } },
              { $limit: 1 },
            ],
          },
        },
      ]);

      // Format the analytics data
      const result = {
        totalEvents: analytics[0].totalEvents[0]?.count || 0,
        statusBreakdown: analytics[0].statusBreakdown.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {}),
        nextUpcoming: analytics[0].nextUpcoming[0] || null,
      };

      return result;
    } catch (error) {
      throw new Error(`Error fetching analytics: ${error.message}`);
    }
  }

  async validateAndFormatEventData(eventData) {
    try {
      if (typeof eventData.dateTime === "string") {
        eventData.dateTime = new Date(eventData.dateTime);
      }

      if (eventData.status === "Completed" && eventData.dateTime > new Date()) {
        throw new Error("Cannot mark future events as completed");
      }

      if (eventData.location) {
        eventData.location = eventData.location.trim().replace(/\s+/g, " ");
      }

      return eventData;
    } catch (error) {
      throw new Error(`Error validating event data: ${error.message}`);
    }
  }

  async createEvent(eventData) {
    try {
      const validatedData = await this.validateAndFormatEventData(eventData);
      const event = new Event(validatedData);
      await event.save();
      return event;
    } catch (error) {
      throw new Error(`Error creating event: ${error.message}`);
    }
  }

  async updateEvent(eventId, updateData) {
    try {
      const validatedData = await this.validateAndFormatEventData(updateData);

      const event = await Event.findById(eventId);
      if (!event) {
        throw new Error("Event not found");
      }

      // Additional update-specific validations
      if (event.status === "Completed" && validatedData.status === "Upcoming") {
        throw new Error("Cannot change completed event back to upcoming");
      }

      Object.assign(event, validatedData);
      await event.save();

      return event;
    } catch (error) {
      throw new Error(`Error updating event: ${error.message}`);
    }
  }

  async deleteEvent(eventId) {
    try {
      const event = await Event.findByIdAndDelete(eventId);

      if (!event) {
        throw new Error("Event not found");
      }

      return event;
    } catch (error) {
      throw new Error(`Error deleting event: ${error.message}`);
    }
  }
}

module.exports = new EventService();
