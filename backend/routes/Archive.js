const express = require("express");
const Archive = require("../models/Archive");

const router = express.Router();

// Create a new record in Archive
router.post("/", async (req, res) => {
  try {
    const record = await Archive.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all records from Archive
router.get("/", async (req, res) => {
  try {
    const records = await Archive.findAll();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific record from Archive by ID
router.get("/:id", async (req, res) => {
  try {
    const record = await Archive.findByPk(req.params.id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific record in Archive by ID
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Archive.update(req.body, {
      where: { T: req.params.id },
    });
    if (updated) {
      const updatedRecord = await Archive.findByPk(req.params.id);
      res.status(200).json(updatedRecord);
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific record from Archive by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Archive.destroy({
      where: { T: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
