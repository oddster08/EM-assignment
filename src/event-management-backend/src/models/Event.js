const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [100, "Event name cannot exceed 100 characters"],
    },
    dateTime: {
      type: Date,
      required: [true, "Event Date and Time is required"],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

//Indexing for search and sorting optimizations
eventSchema.index({ name: "text", location: "text" });
eventSchema.index({ dateTime: 1 });
eventSchema.index({ status: 1 });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
