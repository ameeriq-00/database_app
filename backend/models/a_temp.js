const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Person = require("./Person");

const a_temp = sequelize.define("a_temp", {
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
  E_REPORT: {
    type: DataTypes.STRING,
  },
  CALLER_NUMBER: {
    type: DataTypes.STRING,
  },
  CALLED_NUMBER: {
    type: DataTypes.STRING,
  },
  THIRD_PARTY_NUMBER: {
    type: DataTypes.STRING,
  },
  CALL_INITIAL_TIME: {
    type: DataTypes.DATE,
  },
  CONVERSATION_DURATION: {
    type: DataTypes.INTEGER,
  },
  CITY: {
    type: DataTypes.STRING,
  },
  SITE_NAME: {
    type: DataTypes.STRING,
  },
  CHARGED_MOBILE_USER_IMEI: {
    type: DataTypes.STRING,
  },
  CHARGED_MOBILE_USER_IMSI: {
    type: DataTypes.STRING,
  },
  LON: {
    type: DataTypes.FLOAT,
  },
  LAT: {
    type: DataTypes.FLOAT,
  },
  SITE_ID: {
    type: DataTypes.STRING,
  },
  CGI: {
    type: DataTypes.STRING,
  },
});

module.exports = a_temp;
