const { Calls, Patients, Psychologists } = require("../models/index.js");

const dashboardController = {
  countPsychologists: async (req, res) => {
    const count = await Psychologists.count();

    return res.status(200).json(count);
  },
  countCalls: async (req, res) => {
    const count = await Calls.count();

    return res.status(200).json(count);
  },
  countPatients: async (req, res) => {
    const count = await Patients.count();

    return res.status(200).json(count);
  },
  averageCalls: async (req, res) => {
    const countCalls = await Calls.count();
    const countPsychologists = await Psychologists.count();

    return res
      .status(200)
      .json(Math.round(countCalls / countPsychologists));
  },
};

module.exports = dashboardController;
