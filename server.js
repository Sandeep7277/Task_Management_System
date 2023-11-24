const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = require("./app");
require("colors");

//Create Server
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`✅ Server has started at Port ${port} `.bgCyan.white);
});
