const Calls = require("./Calls");
const Patients = require("./Patients");
const Psychologists = require("./Psychologists");

Psychologists.hasMany(Calls, {
  foreignKey: 'psicologos_id'
});
Calls.belongsTo(Psychologists, {
  foreignKey: 'psicologos_id'
});

Patients.hasMany(Calls, {
  foreignKey: 'pacientes_id'
});
Calls.belongsTo(Patients, {
    foreignKey: 'pacientes_id'
});

module.exports = {
  Psychologists,
  Patients,
  Calls
}