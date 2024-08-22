const express = require("express");
const z_temp = require("../models/z_temp"); // Ensure this path is correct

const router = express.Router();

// Create a new record in z_temp
router.post("/", async (req, res) => {
  try {
    const record = await z_temp.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all records from z_temp
router.get("/", async (req, res) => {
  try {
    const records = await z_temp.findAll();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific record from z_temp by ID
router.get("/:id", async (req, res) => {
  try {
    const record = await z_temp.findByPk(req.params.id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific record in z_temp by ID
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await z_temp.update(req.body, {
      where: { LogID: req.params.id }, // Ensure LogID is the correct primary key
    });
    if (updated) {
      const updatedRecord = await z_temp.findByPk(req.params.id);
      res.status(200).json(updatedRecord);
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific record from z_temp by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await z_temp.destroy({
      where: { LogID: req.params.id }, // Ensure LogID is the correct primary key
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
