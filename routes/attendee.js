const express = require("express");

const {
  createAttendee,
  getAllAttendees,
  getAttendee,
  updateAttendee,
  deleteAttendee,
} = require("../controllers/attendee");

const router = express.Router();

// Create a new attendee
// POST /api/attendee
router.post("/", createAttendee);

// Get all attendees
// GET /api/attendee
router.get("/", getAllAttendees);

// Get a single attendee
// GET /api/attendee/:id
router.get("/:id", getAttendee);

// Update a attendee
// PUT /api/attendee/:id
router.put("/:id", updateAttendee);

// Delete a attendee
// DELETE /api/attendee/:id
router.delete("/:id", deleteAttendee);

module.exports = router;
