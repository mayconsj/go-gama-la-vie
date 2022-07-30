const express = require("express");

const routes = require("./routes");
const db = require("./database");
const handleError = require("./middlewares/handleError");
const authMiddleware = require("./middlewares/auth");
const jwtMiddleware = require("./middlewares/jwt")

const app = express();

db.hasConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  jwtMiddleware.unless({ path: ["/", "/login", "/psicologos"] })
);
app.use(authMiddleware);
app.use(routes);
app.use(handleError);

app.listen(process.env.NODEJS_LOCAL_PORT, () => {
  console.log(`Api is listening on port: ${process.env.NODEJS_LOCAL_PORT}`);
});
