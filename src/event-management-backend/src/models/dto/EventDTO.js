const Joi = require("joi");

class EventDTO {
  static createSchema = Joi.object({
    name: Joi.string().required().trim().max(100).messages({
      "string.empty": "Event name is required",
      "string.max": "Event name cannot exceed 100 characters",
    }),

    dateTime: Joi.date().required().min("now").messages({
      "date.base": "Please provide a valid date and time",
      "date.min": "Event date must be in the future",
    }),

    location: Joi.string().required().trim().max(200).messages({
      "string.empty": "Event location is required",
      "string.max": "Location cannot exceed 200 characters",
    }),

    status: Joi.string()
      .valid("Upcoming", "Ongoing", "Completed")
      .default("Upcoming")
      .messages({
        "any.only": "Status must be either Upcoming, Ongoing, or Completed",
      }),
  });

  static updateSchema = Joi.object({
    name: Joi.string().trim().max(100).messages({
      "string.max": "Event name cannot exceed 100 characters",
    }),

    dateTime: Joi.date().min("now").messages({
      "date.base": "Please provide a valid date and time",
      "date.min": "Event date must be in the future",
    }),

    location: Joi.string().trim().max(200).messages({
      "string.max": "Location cannot exceed 200 characters",
    }),

    status: Joi.string().valid("Upcoming", "Ongoing", "Completed").messages({
      "any.only": "Status must be either Upcoming, Ongoing, or Completed",
    }),
  });
}

module.exports = EventDTO;
