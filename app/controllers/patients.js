const { Patients, Calls } = require("../models/index.js");

const patientsController = {
  getAll: async (req, res) => {
    const patients = await Patients.findAll();
    return res.status(200).json(patients);
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const patient = await Patients.findByPk(id, {
      include: [
        { model: Calls, attributes: { exclude: ["pacientes_id"] } },
      ],
    });

    if (!patient) {
      return res
        .status(404)
        .json(
          `Id not found`
        );
    }
    return res.status(200).json(patient);
  },

  create: async (req, res) => {
    const { nome, email, data_nascimento } = req.body;

    const emailPatient = await Patients.findOne({ where: { email: email } });

    if (emailPatient) {
      return res.status(401).json({ error: "E-mail already registered" });
    }

    const patient = await Patients.create({
      nome,
      email,
      data_nascimento,
    });
    res.status(201).json(patient);
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { nome, email, data_nascimento } = req.body;
    let patient = await Patients.findByPk(id);

    if (!patient) {
      return res
        .status(404)
        .json(
          `Id not found`
        );
    }

    await Patients.update({ nome, email, data_nascimento }, { where: { id } });

    const updatePatient = await Patients.findByPk(id);
    res.status(200).json(updatePatient);
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const patient = await Patients.findByPk(id);

    if (!patient) {
      res
        .status(404)
        .json(
          `Id not Found`
        );
    }

    await Patients.destroy({
      where: { id },
    });

    res.status(204).send("");
  },
};

module.exports = patientsController;
