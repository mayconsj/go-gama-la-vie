const express = require("express");
const routes = express.Router();

const patientsController = require("../controllers/patients");
const psicologoController = require("../controllers/psychologists")
const callsController = require("../controllers/calls");
const dashboardController = require("../controllers/dashboard");

const authValidator = require("../validators/auth/login");
const patientsValidators = require("../validators/patients");
const psychologistsValidators = require("../validators/psychologists");
const callsValidators = require("../validators/calls");

//Rotas Patients
routes.get("/pacientes", patientsController.getAll);
routes.get("/pacientes/:id", patientsValidators.getById, patientsController.getById);
routes.post("/pacientes", patientsValidators.create ,patientsController.create);
routes.put("/pacientes/:id", patientsValidators.update, patientsController.update);
routes.delete("/pacientes/:id", patientsValidators.delete, patientsController.delete);

//Rotas Psychologists
routes.get("/psicologos", psicologoController.getAll);
routes.get("/psicologos/:id", psychologistsValidators.getById, psicologoController.getById);
routes.post("/psicologos", psychologistsValidators.create,psicologoController.create);
routes.put("/psicologos/:id",psychologistsValidators.update, psicologoController.update);
routes.delete("/psicologos/:id", psychologistsValidators.delete, psicologoController.delete);

routes.post("/login", authValidator, psicologoController.login);

routes.get("/atendimentos", callsController.getAll);
routes.get("/atendimentos/:id", callsValidators.getById, callsController.getById);
routes.post("/atendimentos",callsValidators.create,  callsController.create);

routes.get("/dashboard/count-calls", dashboardController.countCalls);
routes.get("/dashboard/count-patients", dashboardController.countPatients);
routes.get("/dashboard/count-psychologists", dashboardController.countPsychologists);
routes.get("/dashboard/average-calls", dashboardController.averageCalls);

module.exports = routes;
