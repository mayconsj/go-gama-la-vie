const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Psychologists, Calls } = require("../models/index.js");
const secret = require("../configs/secret");

const psychologistsController = {
  getAll: async (req, res) => {
    const psychologist = await Psychologists.findAll({
      attributes: { exclude: ["senha"] },
    });

    return res.status(200).json(psychologist);
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const psychologist = await Psychologists.findByPk(id, {
      include: [
        { model: Calls, attributes: { exclude: ["psicologos_id"] } },
      ],
      attributes: { exclude: ["senha"] },
    });

    if (!psychologist) {
      return res
        .status(404)
        .json(
          `Id not found`
        );
    }

    return res.status(200).json(psychologist);
  },

  create: async (req, res) => {
    const { nome, email, apresentacao, senha } = req.body;

    const newPassword = bcrypt.hashSync(senha, 10);

    const emailPsychologist = await Psychologists.findOne({
      where: { email: email },
    });

    if (emailPsychologist) {
      return res.status(401).json({ error: "E-mail already registered" });
    }

    await Psychologists.create({
      nome,
      email,
      apresentacao,
      senha: newPassword,
    });

    res.status(201).json({ nome, email, apresentacao });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { nome, email, apresentacao, senha } = req.body;
    let psychologist = await Psychologists.findByPk(id);

    if (!psychologist) {
      return res
        .status(404)
        .json(
          `Id not found`
        );
    }

    if (senha) {
      const newPassword = bcrypt.hashSync(senha, 10);

      await Psychologists.update(
        { nome, email, apresentacao, senha: newPassword },
        { where: { id } }
      );
    } else {
      await Psychologists.update({ nome, email, apresentacao }, { where: { id } });
    }

    const updatePsychologist = await Psychologists.findByPk(id, {
      attributes: { exclude: ["senha"] },
    });
    res.status(200).json(updatePsychologist);
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const psychologist = await Psychologists.findByPk(id);

    if (!psychologist) {
      res
        .status(404)
        .json(
          `Id not found`
        );
    }

    await Psychologists.destroy({
      where: { id },
    });

    res.status(204).send("");
  },

  login: async (req, res) => {
    const { email, senha } = req.body;

    const psychologist = await Psychologists.findOne({
      where: {
        email,
      },
    });

    if (!psychologist || !bcrypt.compareSync(senha, psychologist.senha)) {
      return res.status(401).json("Invalid email or password");
    }

    const user = {
      id: psychologist.id,
      nome: psychologist.nome,
      email: psychologist.email,
    };

    const token = jwt.sign(user, secret.key);

    return res.json({
      token,
      user,
    });
  },
};

module.exports = psychologistsController;
