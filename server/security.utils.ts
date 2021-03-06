const util = require("util");
const crypto = require("crypto");
import * as jwt from "jsonwebtoken";
import * as fs from "fs";


export const signJwt = util.promisify(jwt.sign);


const RSA_PRIVATE_KEY = fs.readFileSync("./demos/private.key");

const RSA_PUBLIC_KEY = fs.readFileSync("./demos/public.key");

const SESSION_DURATION = 240;


export async function createSessionToken(userId: string) {

  return signJwt({}, RSA_PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn: SESSION_DURATION,
    subject: userId
  });
}

export async function decodeJwt(token: string) {
  const payload = await jwt.verify(token, RSA_PUBLIC_KEY);
  console.log("decode JWT payload:", payload);
  return payload;
}

export function createCsrfToken() {
  const csrfToken = crypto.randomBytes(32).toString("hex");
  return csrfToken;
}
