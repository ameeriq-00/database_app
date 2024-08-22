const express = require("express");
const { Op } = require("sequelize");

const Person = require("../models/Person");
const a_temp = require("../models/a_temp");
const z_temp = require("../models/z_temp");
const k_temp = require("../models/k_temp");
const Archive = require("../models/Archive");
const Dispatch = require("../models/Dispatch");

const router = express.Router();

router.get("/", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    // Step 1: Search in Call Logs
    let linkedPerson = null;

    // Search in a_temp
    const aTempResults = await a_temp.findAll({
      where: {
        [Op.or]: [
          { CALLER_NUMBER: { [Op.like]: `%${query}%` } },
          { CALLED_NUMBER: { [Op.like]: `%${query}%` } },
          { THIRD_PARTY_NUMBER: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    // If found in a_temp, find the linked person
    if (aTempResults.length > 0) {
      linkedPerson = await Person.findByPk(aTempResults[0].PersonID);
    }

    // Search in z_temp
    const zTempResults = await z_temp.findAll({
      where: {
        [Op.or]: [
          { CallingNumber: { [Op.like]: `%${query}%` } },
          { CalledNumber: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    // If found in z_temp, find the linked person
    if (zTempResults.length > 0) {
      linkedPerson =
        linkedPerson || (await Person.findByPk(zTempResults[0].PersonID));
    }

    // Search in k_temp
    const kTempResults = await k_temp.findAll({
      where: {
        [Op.or]: [
          { CALLINGNUMBER: { [Op.like]: `%${query}%` } },
          { CALLEDNUMBER: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    // If found in k_temp, find the linked person
    if (kTempResults.length > 0) {
      linkedPerson =
        linkedPerson || (await Person.findByPk(kTempResults[0].PersonID));
    }

    // If no linked person is found, return the search results
    if (!linkedPerson) {
      return res.status(200).json({
        aTempResults,
        zTempResults,
        kTempResults,
        message: "No linked person found",
      });
    }

    // Step 2: Perform Secondary Search in Archive and Dispatch
    const linkedPersonNumber = linkedPerson.PhoneNumber;

    // Search in Archive using both query and linked person's number
    const archiveResults = await Archive.findAll({
      where: {
        [Op.or]: [
          { phone_number: { [Op.like]: `%${query}%` } },
          { phone_number: { [Op.like]: `%${linkedPersonNumber}%` } },
        ],
      },
    });

    // Search in Dispatch using both query and linked person's number
    const dispatchResults = await Dispatch.findAll({
      where: {
        [Op.or]: [
          { saved_numbers: { [Op.like]: `%${query}%` } },
          { saved_numbers: { [Op.like]: `%${linkedPersonNumber}%` } },
        ],
      },
    });

    // Step 3: Return the results with links between them
    res.status(200).json({
      linkedPerson,
      aTempResults,
      zTempResults,
      kTempResults,
      archiveResults,
      dispatchResults,
      message: "Search completed with linked results",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
