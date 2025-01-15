const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Management API",
      version: "1.0.0",
      description: "API documentation for Event Management System",
    },
    servers: [
      {
        url: "http://localhost:3000/api/",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Event: {
          type: "object",
          required: ["name", "dateTime", "location"],
          properties: {
            _id: {
              type: "string",
              description: "Auto-generated MongoDB ID",
            },
            name: {
              type: "string",
              description: "Event name",
              example: "Tech Conference 2025",
            },
            dateTime: {
              type: "string",
              format: "date-time",
              description: "Event date and time",
              example: "2025-06-15T09:00:00Z",
            },
            location: {
              type: "string",
              description: "Event location",
              example: "Convention Center",
            },
            status: {
              type: "string",
              enum: ["Upcoming", "Ongoing", "Completed"],
              default: "Upcoming",
              description: "Event status",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Last update timestamp",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            message: {
              type: "string",
              example: "Error message",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        Analytics: {
          type: "object",
          properties: {
            totalEvents: {
              type: "number",
              example: 10,
            },
            statusBreakdown: {
              type: "object",
              properties: {
                Upcoming: {
                  type: "number",
                  example: 5,
                },
                Ongoing: {
                  type: "number",
                  example: 3,
                },
                Completed: {
                  type: "number",
                  example: 2,
                },
              },
            },
            nextUpcoming: {
              $ref: "#/components/schemas/Event",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);
