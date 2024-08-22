const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Person = require("./Person");

const k_temp = sequelize.define("k_temp", {
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
  DATETIME: {
    type: DataTypes.DATE,
  },
  CALL_TYPE: {
    type: DataTypes.STRING,
  },
  MSISDN: {
    type: DataTypes.STRING,
  },
  IMSI: {
    type: DataTypes.STRING,
  },
  B_PARTY_MSISDN: {
    type: DataTypes.STRING,
  },
  DURATION: {
    type: DataTypes.INTEGER,
  },
  CALLINGNUMBER: {
    type: DataTypes.STRING,
  },
  CALLEDNUMBER: {
    type: DataTypes.STRING,
  },
  IMEI: {
    type: DataTypes.STRING,
  },
  CALLLOCATION: {
    type: DataTypes.STRING,
  },
  SITE_ID: {
    type: DataTypes.STRING,
  },
  SITE: {
    type: DataTypes.STRING,
  },
  GOVERNORATE: {
    type: DataTypes.STRING,
  },
  LONGITUDE: {
    type: DataTypes.FLOAT,
  },
  LATITUDE: {
    type: DataTypes.FLOAT,
  },
});

module.exports = k_temp;
