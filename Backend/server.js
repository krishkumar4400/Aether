import "dotenv/config";
import app from "./src/app.js";
import http from "http";

const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is up and running on http://localhost"${port}`);
});
