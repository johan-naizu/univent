const express = require("express");

const {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");

const router = express.Router();

// Create an event
// POST /api/events
// Access: Event Coordinator and above

router.post("/", createEvent);

// Get all events
// GET /api/events
// Access: All users

router.get("/", getAllEvents);

// Get a single event
// GET /api/events/:id
// Access: All users

router.get("/:id", getEvent);

// Update an event
// PUT /api/events/:id
// Access: Event Coordinator and above

router.put("/:id", updateEvent);

// Delete an event
// DELETE /api/events/:id
// Access: Event Coordinator and above

router.delete("/:id", deleteEvent);

module.exports = router;
