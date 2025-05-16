const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ImportantLink = require("../models/ImportantLink");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  const { title } = req.body;
  const newFile = new ImportantLink({ title, filename: req.file.filename });
  await newFile.save();
  res.status(201).json({ message: "Notice uploaded" });
});

router.get("/", async (req, res) => {
  const links = await ImportantLink.find();
  res.json(links);
});

router.delete("/:id", async (req, res) => {
  await ImportantLink.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
