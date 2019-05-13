

import * as express from "express";
import {Application} from "express";
import * as fs from "fs";
import * as https from "https";
import {readAllLessons} from "./read-all-lessons.route";
import { AddressInfo } from "net";
import { createUser } from "./create-user.route";
import { getUser } from "./get-user.route";
import { logout } from "./logout.route";
import { login } from "./login.route";
import { retrieveUserInfoFromRequest } from "./get-user.middleware";
import { checkIfAuthenticated } from "./auth.middleware";

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app: Application = express();

// *JA* the order of the middleware is important due to dependencies among them
app.use(cookieParser());
app.use(retrieveUserInfoFromRequest);
app.use(bodyParser.json());

const commandLineArgs = require("command-line-args");

const optionDefinitions = [
  { name: "verbose", alias: "v", type: Boolean },
  { name: "secure", type: Boolean,  defaultOption: true }
];

const options = commandLineArgs(optionDefinitions);

console.log("Options: %o", options);

// REST API
app.route("/api/user")
  .get(getUser);

// *JA* checkIfAuthenticated works like a middleware, however only for this route
app.route("/api/lessons")
  .get(checkIfAuthenticated, readAllLessons);

app.route("/api/signup")
  .post(createUser);

app.route("/api/logout")
  .post(checkIfAuthenticated, logout);

app.route("/api/login")
  .post(login);


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








