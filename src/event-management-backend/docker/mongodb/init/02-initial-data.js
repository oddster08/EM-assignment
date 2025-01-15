db = db.getSiblingDB("event-management");
const today = new Date("2025-01-12T00:00:00Z");

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function getCreatedAt(dateTime, status) {
  if (status === "Completed") {
    return getRandomDate(
      new Date(dateTime.getTime() - 15 * 24 * 60 * 60 * 1000),
      dateTime
    );
  } else if (status === "Upcoming") {
    return getRandomDate(
      today,
      new Date(dateTime.getTime() - 15 * 24 * 60 * 60 * 1000)
    );
  }
  return new Date();
}

db.events.find().forEach((event) => {
  event.createdAt = getCreatedAt(event.dateTime, event.status);
  db.events.save(event);
});
db.events.insertMany([
  {
    name: "Annual Meeting 2023",
    dateTime: new Date("2023-03-10T10:00:00Z"),
    location: "Headquarters",
    status: "Completed",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Summer Workshop 2024",
    dateTime: new Date("2024-08-20T09:00:00Z"),
    location: "Community Center",
    status: "Upcoming",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Winter Gala 2023",
    dateTime: new Date("2023-12-15T19:00:00Z"),
    location: "Banquet Hall",
    status: "Upcoming",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Spring Festival 2023",
    dateTime: new Date("2023-04-05T11:00:00Z"),
    location: "City Park",
    status: "Completed",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Developer Summit 2023",
    dateTime: new Date("2023-11-01T09:00:00Z"),
    location: "Tech Hub",
    status: "Completed",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Tech Conference 2025",
    dateTime: new Date("2025-06-15T09:00:00Z"),
    location: "Convention Center",
    status: "Upcoming",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Product Launch",
    dateTime: new Date("2025-07-01T14:00:00Z"),
    location: "Virtual Event",
    status: "Upcoming",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);
