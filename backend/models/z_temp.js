const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Person = require("./Person");

const z_temp = sequelize.define(
  "z_temp",
  {
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
      onDelete: "CASCADE",
    },
    Date: DataTypes.DATE,
    CALL_TYPE: DataTypes.STRING,
    Duration: DataTypes.INTEGER,
    CallingNumber: DataTypes.STRING,
    CalledNumber: DataTypes.STRING,
    CallLocation: DataTypes.STRING,
    SiteID: DataTypes.STRING,
    Split: DataTypes.STRING,
  },
  {
    tableName: "z_temp",
    timestamps: true,
  }
);

module.exports = z_temp;
