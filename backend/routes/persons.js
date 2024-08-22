const express = require("express");
const multer = require("multer");
const Person = require("../models/Person");

const router = express.Router();

// Set up multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this path exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Create a new person
router.post("/", upload.single("excelFile"), async (req, res) => {
  try {
    const { Name, PhoneNumber } = req.body;

    // Basic validation
    if (!Name || !PhoneNumber) {
      return res
        .status(400)
        .json({ error: "Name and Phone Number are required" });
    }

    const newPerson = await Person.create({
      Name,
      PhoneNumber,
      excelFile: req.file ? req.file.filename : null,
    });

    res.status(201).json(newPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all persons
router.get("/", async (req, res) => {
  try {
    const persons = await Person.findAll();
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a person by ID
router.get("/:id", async (req, res) => {
  try {
    const person = await Person.findByPk(req.params.id);
    if (person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a person by ID
router.put("/:id", upload.single("excelFile"), async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, PhoneNumber } = req.body;

    const person = await Person.findByPk(id);
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }

    // Update the person's details
    person.Name = Name || person.Name;
    person.PhoneNumber = PhoneNumber || person.PhoneNumber;

    // Update the excelFile field only if a new file is provided
    if (req.file) {
      person.excelFile = req.file.filename;
    }

    await person.save();
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a person by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Person.destroy({
      where: { PersonID: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: "Person deleted successfully" });
    } else {
      res.status(404).json({ error: "Person not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
