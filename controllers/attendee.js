//controller for Attendee
const Attendee = require("../models/attendee");

//create attendee
const createAttendee = async (req, res) => {
  const { name, email, phone, organisation } = req.body;
  try {
    const attendee = await Attendee.findOne({ email });
    if (attendee) {
      return res.status(400).json({ error: "Attendee already exists" });
    }
    const newAttendee = new Attendee({
      name,
      email,
      phone,
      organisation,
    });
    await newAttendee.save();
    res.status(201).json({ message: "Attendee created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all attendees
const getAllAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get a single attendee
const getAttendee = async (req, res) => {
  const { id } = req.params;
  try {
    const attendee = await Attendee.findById(id);
    if (!attendee) {
      return res.status(404).json({ error: "Attendee not found" });
    }
    res.status(200).json(attendee);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update attendee
const updateAttendee = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, organisation, events, tickets, privileges } =
    req.body;
  try {
    const attendee = await Attendee.findById(id);
    if (!attendee) {
      return res.status(404).json({ error: "Attendee not found" });
    }
    attendee.name = name;
    attendee.email = email;
    attendee.phone = phone;
    attendee.organisation = organisation;
    attendee.events = events;
    attendee.tickets = tickets;
    attendee.privileges = privileges;
    await attendee.save();
    res.status(200).json({ message: "Attendee updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete attendee
const deleteAttendee = async (req, res) => {
  const { id } = req.params;
  try {
    const attendee = await Attendee.findById(id);
    if (!attendee) {
      return res.status(404).json({ error: "Attendee not found" });
    }
    await Attendee.findByIdAndDelete(id);
    res.status(200).json({ message: "Attendee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createAttendee,
  getAllAttendees,
  getAttendee,
  updateAttendee,
  deleteAttendee,
};
