const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Material = require("../models/Material");

// File storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });


router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, topic } = req.body;
    const newMaterial = new Material({
      title,
      topic: topic.toLowerCase(),
      filename: req.file.filename,
    });
    await newMaterial.save();
    res.status(201).json({ message: "Material uploaded successfully" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Server error during upload" });
  }
});

router.get("/", async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching all materials:", error);
    res.status(500).json({ error: "Failed to fetch materials" });
  }
});

router.get("/:topic", async (req, res) => {
  const topic = req.params.topic.toLowerCase();

  try {
    const materials = await Material.find({ topic });
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ error: "Failed to fetch materials" });
  }
});

// DELETE: Remove material by ID
router.delete("/:id", async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Material deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete material" });
  }
});


module.exports = router;
