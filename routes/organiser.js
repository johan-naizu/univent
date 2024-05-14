//routes for organiser
const express = require("express");

const {
  createOrganiser,
  loginOrganiser,
  getOrganisers,
  getOrganiserById,
  updateOrganiser,
  deleteOrganiser,
} = require("../controllers/organiser");

const router = express.Router();

//routes
//create organiser
router.post("/create", createOrganiser);
//login organiser
router.post("/login", loginOrganiser);
//get organisers
router.get("/", getOrganisers);
//get organiser by id
router.get("/:id", getOrganiserById);
//update organiser
router.put("/:id", updateOrganiser);
//delete organiser
router.delete("/:id", deleteOrganiser);

module.exports = router;
