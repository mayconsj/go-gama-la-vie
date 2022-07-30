const db = require("../database");
const DataTypes = require("sequelize");
const Patients = require("./Patients");
const Psychologists = require("./Psychologists");

const Calls = db.define(
  "Calls",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    observacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    pacientes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      Reference: {
        model: Patients,
        key: "id",
      },
    },
    psicologos_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      Reference: {
        model: Psychologists,
        key: "id",
      },
    },
  },

  {
    tableName: "atendimentos",
    underscored: true,
    timestamps: false,
  }
);

module.exports = Calls;
