//controller for Organiser
const Organiser = require("../models/organiser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
//create organiser
const createOrganiser = async (req, res) => {
  const { name, email, phone, password, type } = req.body;
  try {
    const organiser = await Organiser.findOne({ email });
    if (organiser) {
      return res.status(400).json({ error: "Organiser already exists" });
    }
    if (req.userData.type !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newOrganiser = new Organiser({
      name,
      email,
      phone,
      password: hashedPassword,
      type,
    });
    await newOrganiser.save();
    res.status(201).json({ message: "Organiser created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//login organiser
const loginOrganiser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const organiser = await Organiser.findOne({ email });
    if (!organiser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      organiser.password,
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: organiser.email, id: organiser._id, type: organiser.type },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );
    res.status(200).json({ token, organiser });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//get all organisers
const getOrganisers = async (req, res) => {
  try {
    const organisers = await Organiser.find();
    res.status(200).json(organisers);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//get organiser by id
const getOrganiserById = async (req, res) => {
  const { id } = req.params;
  try {
    const organiser = await Organiser.findById(id);
    if (!organiser) {
      return res.status(404).json({ error: "Organiser not found" });
    }
    res.status(200).json(organiser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//update organiser
const updateOrganiser = async (req, res) => {
  const { id } = req.params;
  if (req.userData.type !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { name, email, phone, password, type } = req.body;
  try {
    const organiser = await Organiser.findById(id);
    if (!organiser) {
      return res.status(404).json({ error: "Organiser not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedOrganiser = {
      name,
      email,
      phone,
      password: hashedPassword,
      type,
    };
    await Organiser.findByIdAndUpdate(id, updatedOrganiser, { new: true });
    res.status(200).json({ message: "Organiser updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//delete organiser
const deleteOrganiser = async (req, res) => {
  const { id } = req.params;
  if (req.userData.type !== "admin") {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const organiser = await Organiser.findById(id);
    if (!organiser) {
      return res.status(404).json({ error: "Organiser not found" });
    }
    await Organiser.findByIdAndDelete(id);
    res.status(200).json({ message: "Organiser deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createOrganiser,
  loginOrganiser,
  getOrganisers,
  getOrganiserById,
  updateOrganiser,
  deleteOrganiser,
};
