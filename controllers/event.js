//controller for Event
const Event = require("../models/event");
//create event
const createEvent = async (req, res) => {
  const { name, description, date, time, location, attendeeCount } = req.body;
  try {
    const event = await Event.findOne({ name });
    if (event) {
      return res.status(400).json({ error: "Event already exists" });
    }
    const newEvent = new Event({
      name,
      description,
      date,
      time,
      location,
      attendeeCount,
    });
    await newEvent.save();
    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get a single event
const getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { name, description, date, time, location, attendeeCount } = req.body;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    event.name = name;
    event.description = description;
    event.date = date;
    event.time = time;
    event.location;
    event.attendeeCount = attendeeCount;
    await event.save();
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete event
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
