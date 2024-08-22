const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Person = require("./Person");

const z_temp = sequelize.define("z_temp", {
  LogID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  PersonID: {
    type: DataTypes.INTEGER,
    references: {
      model: Person,
      key: "PersonID",
    },
  },
  Date: {
    type: DataTypes.DATE,
  },
  CALL_TYPE: {
    type: DataTypes.STRING,
  },
  Duration: {
    type: DataTypes.INTEGER,
  },
  CallingNumber: {
    type: DataTypes.STRING,
  },
  CalledNumber: {
    type: DataTypes.STRING,
  },
  CallLocation: {
    type: DataTypes.STRING,
  },
  SiteID: {
    type: DataTypes.STRING,
  },
  Split: {
    type: DataTypes.STRING,
  },
});

module.exports = z_temp;
