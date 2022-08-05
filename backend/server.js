const { PORT } = require("./config");
const app = require("./app");

app.listen(PORT, () => {
  console.log(`🤗 Avent App listening on port ${PORT}`);
});
