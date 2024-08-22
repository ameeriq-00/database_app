const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./db");

// Importing the models
const Person = require("./models/Person");
const a_temp = require("./models/a_temp");
const z_temp = require("./models/z_temp");
const k_temp = require("./models/k_temp");
const Archive = require("./models/Archive");
const Dispatch = require("./models/Dispatch");
const Media = require("./models/Media");

// Importing the routes
const personsRouter = require("./routes/persons");
const aTempRouter = require("./routes/a_temp");
const zTempRouter = require("./routes/z_temp");
const kTempRouter = require("./routes/k_temp");
const archiveRouter = require("./routes/Archive");
const dispatchRouter = require("./routes/Dispatch");
const importRouter = require("./routes/import");
const searchRouter = require("./routes/search");
const mediaRouter = require("./routes/media");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Sync the models with the database
sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
});

// API routes
app.use("/api/persons", personsRouter);
app.use("/api/a_temp", aTempRouter);
app.use("/api/z_temp", zTempRouter);
app.use("/api/k_temp", kTempRouter);
app.use("/api/archive", archiveRouter);
app.use("/api/dispatch", dispatchRouter);
app.use("/api/import", importRouter);
app.use("/api/search", searchRouter);
app.use("/api/media", mediaRouter);

app.get("/", (req, res) => {
  res.send("API Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
