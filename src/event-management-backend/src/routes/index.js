const express = require("express");
const router = express.Router();
const eventRoutes = require("./eventRoutes");

router.use("/event", eventRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = router;
