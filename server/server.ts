

import * as express from "express";
import {Application} from "express";
import * as fs from "fs";
import * as https from "https";
import {readAllLessons} from "./read-all-lessons.route";
import { AddressInfo } from "net";
import { createUser } from "./create-user.route";

const bodyParser = require("body-parser");

const app: Application = express();

app.use(bodyParser.json());

const commandLineArgs = require("command-line-args");

const optionDefinitions = [
  { name: "verbose", alias: "v", type: Boolean },
  { name: "secure", type: Boolean,  defaultOption: true }
];

const options = commandLineArgs(optionDefinitions);

console.log("Options: %o", options);

// REST API
app.route("/api/lessons")
  .get(readAllLessons);

app.route("/api/signup")
  .post(createUser);



if (options.secure) {

  const httpsServer = https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
  }, app);

  // console.log("httpsServer: %o", httpsServer);

  // launch an HTTPS Server. Note: this does NOT mean that the application is secure
  httpsServer.listen(9000, () => {
    const address = httpsServer.address() as AddressInfo;
    console.log("HTTPS Secure Server running at https://localhost:" + address.port);
  });

} else {

  // launch an HTTP Server
  const httpServer = app.listen(9000, () => {
    const address = httpServer.address() as AddressInfo;
    console.log("HTTP Server running at http://localhost:" + address.port);
  });

}








