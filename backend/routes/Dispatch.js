const express = require("express");
const Dispatch = require("../models/Dispatch");

const router = express.Router();

// Create a new record in Dispatch
router.post("/", async (req, res) => {
  try {
    const record = await Dispatch.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all records from Dispatch
router.get("/", async (req, res) => {
  try {
    const records = await Dispatch.findAll();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific record from Dispatch by ID
router.get("/:id", async (req, res) => {
  try {
    const record = await Dispatch.findByPk(req.params.id);
    if (record) {
      res.status(200).json(record);
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific record in Dispatch by ID
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Dispatch.update(req.body, {
      where: { T: req.params.id },
    });
    if (updated) {
      const updatedRecord = await Dispatch.findByPk(req.params.id);
      res.status(200).json(updatedRecord);
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific record from Dispatch by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Dispatch.destroy({
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
