const express = require("express");
const path = require("path");
const fs = require("fs");
const uploadMedia = require("../uploadMedia");
const Media = require("../models/Media");
const Person = require("../models/Person");

const router = express.Router();

// Upload media file and link it to a person
router.post(
  "/upload/:personID",
  uploadMedia.single("file"),
  async (req, res) => {
    try {
      const { personID } = req.params;
      const person = await Person.findByPk(personID);

      if (!person) {
        return res.status(400).json({ error: "Person not found" });
      }

      const filePath = path.join("media", req.file.filename);

      await Media.create({
        PersonID: personID,
        filePath,
        fileType: req.file.mimetype,
      });

      res
        .status(200)
        .json({ message: "File uploaded and linked to person successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Retrieve all media files linked to a person
router.get("/person/:personID", async (req, res) => {
  try {
    const { personID } = req.params;
    const mediaFiles = await Media.findAll({ where: { PersonID: personID } });

    res.status(200).json(mediaFiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update media file metadata
router.put("/:mediaID", async (req, res) => {
  try {
    const { mediaID } = req.params;
    const updated = await Media.update(req.body, {
      where: { MediaID: mediaID },
    });

    if (updated[0] === 0) {
      return res.status(404).json({ error: "Media not found" });
    }

    const updatedMedia = await Media.findByPk(mediaID);
    res.status(200).json(updatedMedia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete media file
router.delete("/:mediaID", async (req, res) => {
  try {
    const { mediaID } = req.params;
    const media = await Media.findByPk(mediaID);

    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }

    // Delete the file from the filesystem
    fs.unlinkSync(media.filePath);

    // Delete the metadata from the database
    await Media.destroy({
      where: { MediaID: mediaID },
    });

    res.status(200).json({ message: "Media file deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
