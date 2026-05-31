require("dotenv/config");
const app = require("./src/app.js");
const http = require("http");
const connectToDB = require("./src/config/database.js");

const port = process.env.PORT || 4000;

const server = http.createServer(app);
connectToDB();

server.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
});
