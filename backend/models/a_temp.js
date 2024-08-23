const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Person = require("./Person");

const a_temp = sequelize.define(
  "a_temp",
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
      onDelete: "CASCADE", // Ensures records are deleted if the person is deleted
    },
    E_REPORT: DataTypes.STRING,
    CALLER_NUMBER: DataTypes.STRING,
    CALLED_NUMBER: DataTypes.STRING,
    THIRD_PARTY_NUMBER: DataTypes.STRING,
    CALL_INITIAL_TIME: DataTypes.DATE,
    CONVERSATION_DURATION: DataTypes.INTEGER,
    CITY: DataTypes.STRING,
    SITE_NAME: DataTypes.STRING,
    CHARGED_MOBILE_USER_IMEI: DataTypes.STRING,
    CHARGED_MOBILE_USER_IMSI: DataTypes.STRING,
    LON: DataTypes.FLOAT,
    LAT: DataTypes.FLOAT,
    SITE_ID: DataTypes.STRING,
    CGI: DataTypes.STRING,
  },
  {
    tableName: "a_temp",
    timestamps: true,
  }
);

module.exports = a_temp;
