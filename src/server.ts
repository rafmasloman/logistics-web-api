import express from "express";
import BootstrapConfig from "./config/app";

const port = process.env.PORT;

const server = express();

server.use(express.json());

const Bootstrap = new BootstrapConfig(server);

Bootstrap.app();

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
