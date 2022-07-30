const db = require("../database");
const DataTypes = require("sequelize");

const Patients = db.define(
  "Patients",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },

  {
    tableName: "pacientes",
    timestamps: false,
  }
);

module.exports = Patients;
