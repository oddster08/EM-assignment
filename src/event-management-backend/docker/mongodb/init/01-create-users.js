db.createUser({
  user: "eventuser",
  pwd: "eventpass",
  roles: [
    {
      role: "readWrite",
      db: "event-management",
    },
  ],
});
