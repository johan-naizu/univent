//create first admin user
const Organiser = require("../models/organiser");
const bcrypt = require("bcrypt");

const createFirstAdmin = async () => {
  try {
    const admin = await Organiser.findOne({ type: "admin" });
    if (admin) {
      return;
    }
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    const newAdmin = new Organiser({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      phone: "1234567890",
      password: hashedPassword,
      type: "admin",
    });
    await newAdmin.save();
  } catch (error) {
    console.log(error);
  }
};

module.exports = createFirstAdmin;
