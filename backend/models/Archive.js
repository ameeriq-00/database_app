const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Archive = sequelize.define(
  "Archive",
  {
    T: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phone_number: DataTypes.STRING,
    name_info: DataTypes.STRING,
    bookid: DataTypes.STRING,
    app_book_date: DataTypes.DATE,
    recived_from: DataTypes.STRING,
    accused_char: DataTypes.STRING,
    app_form: DataTypes.STRING,
    app_date: DataTypes.DATE,
    period_fromto: DataTypes.STRING,
    tech_name: DataTypes.STRING,
    app_kind: DataTypes.STRING,
  },
  {
    tableName: "Archive",
    timestamps: true,
  }
);

module.exports = Archive;
