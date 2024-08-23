const express = require("express");
const path = require("path");
const xlsx = require("xlsx");
const fs = require("fs");
const uploadExcel = require("../uploadExcel");
const a_temp = require("../models/a_temp");
const z_temp = require("../models/z_temp");
const k_temp = require("../models/k_temp");
const Person = require("../models/Person");

const router = express.Router();

const processExcel = async (filePath, Model, PersonID) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet);

  for (const row of rows) {
    row.PersonID = PersonID;
    await Model.create(row);
  }

  fs.unlinkSync(filePath);
};

const detectTemplate = (headers) => {
  if (headers.includes("E_REPORT")) return "a_temp";
  if (headers.includes("Date")) return "z_temp";
  if (headers.includes("DATETIME")) return "k_temp";
  return null;
};

router.post("/:personID", uploadExcel.single("file"), async (req, res) => {
  try {
    const { personID } = req.params;
    const person = await Person.findByPk(personID);

    if (!person) {
      return res.status(400).json({ error: "Person not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../", req.file.path);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const headers = xlsx.utils.sheet_to_json(sheet, { header: 1 })[0];

    const detectedTemplate = detectTemplate(headers);

    if (!detectedTemplate) {
      return res
        .status(400)
        .json({
          error:
            "Unknown template type. Please ensure the Excel file matches one of the known templates.",
        });
    }

    let Model;
    switch (detectedTemplate) {
      case "a_temp":
        Model = a_temp;
        break;
      case "z_temp":
        Model = z_temp;
        break;
      case "k_temp":
        Model = k_temp;
        break;
      default:
        return res.status(400).json({ error: "Invalid template detected." });
    }

    await processExcel(filePath, Model, personID);

    res
      .status(200)
      .json({ message: `Data imported successfully to ${detectedTemplate}.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
