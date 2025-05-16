const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Coordinator = require("../models/Coordinator");

// File storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// POST: Add coordinator
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { name, email } = req.body;
    const photo = req.file ? req.file.filename : null;

    const newCoordinator = new Coordinator({ name, email, photo });
    await newCoordinator.save();

    res.status(201).json({ message: "Coordinator added successfully" });
  } catch (err) {
    console.error("Error adding coordinator:", err);
    res.status(500).json({ error: "Failed to add coordinator" });
  }
});

// GET: Fetch all coordinators
router.get("/", async (req, res) => {
    try {
      const coordinators = await Coordinator.find();
      res.json(coordinators);
    } catch (err) {
      console.error("Error fetching coordinators:", err);
      res.status(500).json({ error: "Failed to fetch coordinators" });
    }
  });
  

// DELETE: Remove a coordinator by ID
router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await Coordinator.findByIdAndDelete(id);
      res.status(200).json({ message: "Coordinator deleted successfully" });
    } catch (err) {
      console.error("Error deleting coordinator:", err);
      res.status(500).json({ error: "Failed to delete coordinator" });
    }
  });
  
module.exports = router;
