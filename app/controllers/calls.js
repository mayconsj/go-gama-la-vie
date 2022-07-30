const { Calls, Patients, Psychologists } = require("../models/index.js");
const base64 = require('base-64');
const utf8 = require('utf8');

const callsController = {
  getAll: async (req, res) => {
    const calls = await Calls.findAll({
      include: [{ model: Patients, attributes: ["nome"] },{ model: Psychologists, attributes: ["nome"] }],
    });
    return res.status(200).json(calls);
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const call = await Calls.findByPk(id, {
      include: [Patients, { model: Psychologists, attributes: { exclude: ["senha"] } }],
    });

    if (!call) {
      return res
        .status(404)
        .json(
          `Id not found`
        );
    }
    return res.status(200).json(call);
  },

  create: async (req, res) => {
    const token = req.headers.authorization.slice(7).split(".")
    const bytes = base64.decode(token[1]);
    const text = utf8.decode(bytes);
    const tokenInfo = JSON.parse(text);
    const psicologos_id = tokenInfo.id
   
    const { data, observacao, pacientes_id } = req.body;

    const call = await Calls.create({
      data,
      observacao,
      pacientes_id,
      psicologos_id,
    });
    res.status(201).json(call);
  },
};

module.exports = callsController;
