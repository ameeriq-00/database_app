const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const xlsx = require("xlsx");
const a_temp = require("../models/a_temp");
const z_temp = require("../models/z_temp");
const k_temp = require("../models/k_temp");
const Person = require("../models/Person");

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Function to process Excel file and save data to the database
const processExcel = async (filePath, Model, PersonID) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet);

  for (const row of rows) {
    row.PersonID = PersonID; // Link each row to the PersonID
    await Model.create(row);
  }

  fs.unlinkSync(filePath); // Delete the file after processing
};

// Endpoint to handle Excel file upload and data import
router.post("/import/:personID", upload.single("file"), async (req, res) => {
  try {
    const { personID } = req.params;
    const person = await Person.findByPk(personID);

    if (!person) {
      return res.status(400).json({ error: "Person not found" });
    }

    const filePath = path.join(__dirname, "../", req.file.path);

    // Determine the correct model based on the Excel file headers
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const headers = Object.keys(
      xlsx.utils.sheet_to_json(sheet, { header: 1 })[0]
    );

    if (headers.includes("E_REPORT") && headers.includes("CALLER_NUMBER")) {
      await processExcel(filePath, a_temp, personID);
    } else if (headers.includes("Date") && headers.includes("CALL_TYPE")) {
      await processExcel(filePath, z_temp, personID);
    } else if (headers.includes("DATETIME") && headers.includes("CALL_TYPE")) {
      await processExcel(filePath, k_temp, personID);
    } else {
      return res.status(400).json({ error: "Unknown Excel template" });
    }

    res.status(200).json({ message: "Data imported successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
