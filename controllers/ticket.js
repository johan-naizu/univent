//controller for Ticket
const Ticket = require("../models/ticket");
//create ticket
const createTicket = async (req, res) => {
  const { attendee, event, allowedEntries, privileges, entryCount } = req.body;
  try {
    const ticket = await Ticket.findOne({ attendee, event });
    if (ticket) {
      return res.status(400).json({ error: "Ticket already exists" });
    }
    const newTicket = new Ticket({
      attendee,
      event,
      allowedEntries,
      privileges,
      entryCount,
    });
    await newTicket.save();
    res.status(201).json({ message: "Ticket created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get a single ticket
const getTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update ticket
const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { attendee, event, allowedEntries, privileges, entryCount } = req.body;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    ticket.attendee = attendee;
    ticket.event = event;
    ticket.allowedEntries = allowedEntries;
    ticket.privileges = privileges;
    ticket.entryCount = entryCount;
    await ticket.save();
    res.status(200).json({ message: "Ticket updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete ticket
const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    await Ticket.findByIdAndDelete(id);
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicket,
  updateTicket,
  deleteTicket,
};
