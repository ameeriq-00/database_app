const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Person = require("./Person");

const k_temp = sequelize.define(
  "k_temp",
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
    DATETIME: DataTypes.DATE,
    CALL_TYPE: DataTypes.STRING,
    MSISDN: DataTypes.STRING,
    IMSI: DataTypes.STRING,
    B_PARTY_MSISDN: DataTypes.STRING,
    DURATION: DataTypes.INTEGER,
    CALLINGNUMBER: DataTypes.STRING,
    CALLEDNUMBER: DataTypes.STRING,
    IMEI: DataTypes.STRING,
    CALLLOCATION: DataTypes.STRING,
    SITE_ID: DataTypes.STRING,
    SITE: DataTypes.STRING,
    GOVERNORATE: DataTypes.STRING,
    LONGITUDE: DataTypes.FLOAT,
    LATITUDE: DataTypes.FLOAT,
  },
  {
    tableName: "k_temp",
    timestamps: true,
  }
);

module.exports = k_temp;
