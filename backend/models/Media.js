const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Person = require("./Person");

const Media = sequelize.define("Media", {
  MediaID: {
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
    allowNull: false,
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Media;
