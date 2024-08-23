const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Person = require("./Person");

const Media = sequelize.define(
  "Media",
  {
    MediaID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PersonID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Person,
        key: "PersonID",
      },
      onDelete: "CASCADE",
    },
    filePath: DataTypes.STRING,
    fileType: DataTypes.STRING,
  },
  {
    tableName: "Media",
    timestamps: true,
  }
);

module.exports = Media;
