const express = require("express");

const {
  createTicket,
  getAllTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticket");

const router = express.Router();

// Create ticket
// POST /ticket
// Optional fields: attendee

router.post("/", createTicket);

// Get all tickets
// GET /ticket

router.get("/", getAllTickets);

// Get ticket by id
// GET /ticket/:id

router.get("/:id", getTicket);

// Update ticket by id
// PUT /ticket/:id

router.put("/:id", updateTicket);

// Delete ticket by id
// DELETE /ticket/:id

router.delete("/:id", deleteTicket);

module.exports = router;
