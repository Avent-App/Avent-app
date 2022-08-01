const express = require("express");
const app = express();
const { PORT } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const authRoute = require("./routes/auth.js");
const eventRoute = require("./routes/event.js");
const userRoute = require("./routes/user.js");
const { NotFoundError } = require("./utils/errors");
const security = require("./middleware/security.js");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use(security.extractUserFromJwt);

app.use("/auth", authRoute);
app.use("/event", eventRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send({ isitworking: "yesitis" });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.use((req, res, next) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  console.log(err);

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, () => {
  console.log(`🤗 Avent App listening on port ${PORT}`);
});
