const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Event = require("../models/Event");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, month, year } = req.body;
    const event = new Event({ title, month, year, filename: req.file.filename });
    await event.save();
    res.status(201).json({ message: "Event added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding event" });
  }
});

router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});

module.exports = router;
