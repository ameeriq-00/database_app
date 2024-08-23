const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Person = sequelize.define(
  "Person",
  {
    PersonID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CreatedDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Persons", // Explicitly specify the table name
    timestamps: true, // Disable createdAt and updatedAt columns
  }
);

module.exports = Person;
