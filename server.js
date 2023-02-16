const app = require("./app");
const config = require("./app/config");

const PORT = config.app.port;
app.listen.apply(PORT, () => {
  console.log(`Server is running on port ${PORT},`);
});
