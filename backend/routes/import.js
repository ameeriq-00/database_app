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

// Define the expected headers for each template
const aTempHeaders = [
  "E_REPORT",
  "CALLER_NUMBER",
  "CALLED_NUMBER",
  "THIRD_PARTY_NUMBER",
  "CALL_INITIAL_TIME",
  "CONVERSATION_DURATION",
  "CITY",
  "SITE_NAME",
  "CHARGED_MOBILE_USER_IMEI",
  "CHARGED_MOBILE_USER_IMSI",
  "LON",
  "LAT",
  "SITE_ID",
  "CGI",
];

const zTempHeaders = [
  "Date",
  "CALL_TYPE",
  "Duration",
  "Calling Number",
  "Called Number",
  "Call Location",
  "Site ID",
  "Split",
];

const kTempHeaders = [
  "DATETIME",
  "CALL_TYPE",
  "MSISDN",
  "IMSI",
  "B_PARTY_MSISDN",
  "DURATION",
  "CALLINGNUMBER",
  "CALLEDNUMBER",
  "IMEI",
  "CALLLOCATION",
  "SITE_ID",
  "SITE",
  "GOVERNORATE",
  "LONGITUDE",
  "LATITUDE",
];

// Function to detect the template based on headers
const detectTemplate = (headers) => {
  if (aTempHeaders.every((header) => headers.includes(header))) {
    return "a_temp";
  } else if (zTempHeaders.every((header) => headers.includes(header))) {
    return "z_temp";
  } else if (kTempHeaders.every((header) => headers.includes(header))) {
    return "k_temp";
  } else {
    return null;
  }
};

// Function to process the Excel file based on the detected template
const processExcel = async (filePath, Model, PersonID) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet);

  if (rows.length === 0) {
    throw new Error("The uploaded Excel file is empty.");
  }

  let insertedCount = 0;

  for (const row of rows) {
    row.PersonID = PersonID; // Link each row to the PersonID
    await Model.create(row);
    insertedCount++;
  }

  fs.unlinkSync(filePath); // Delete the file after processing

  console.log(`${insertedCount} rows inserted into ${Model.name}`);
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

    console.log("File uploaded:", req.file); // Log the file details

    const filePath = path.join(__dirname, "../", req.file.path);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const headers = xlsx.utils.sheet_to_json(sheet, { header: 1 })[0];

    console.log("Excel Headers:", headers); // Log the headers to verify

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
    console.error("Error processing file:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
