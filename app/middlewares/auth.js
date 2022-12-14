const { Psychologists } = require("../models");

module.exports = async (req, res, next) => {
  if (req.auth) {
    const psicologo = await Psychologists.findByPk(req.auth.id);
    if (!psicologo) {
      next({
        status: 401,
        name: "UnauthorizedError",
        inner: {
          message: "Invalid user code",
        },
      });
    }
  }

  next();
};
