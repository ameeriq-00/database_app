const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Archive = sequelize.define("Archive", {
  T: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phone_number: {
    type: DataTypes.STRING,
  },
  name_info: {
    type: DataTypes.STRING,
  },
  bookid: {
    type: DataTypes.STRING,
  },
  app_book_date: {
    type: DataTypes.DATE,
  },
  recived_from: {
    type: DataTypes.STRING,
  },
  accused_char: {
    type: DataTypes.STRING,
  },
  app_form: {
    type: DataTypes.STRING,
  },
  app_date: {
    type: DataTypes.DATE,
  },
  period_fromto: {
    type: DataTypes.STRING,
  },
  tech_name: {
    type: DataTypes.STRING,
  },
  app_kind: {
    type: DataTypes.STRING,
  },
});

module.exports = Archive;
