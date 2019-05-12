import { Request, Response } from "express";
import { sessionStore } from "./session-store";
import { db } from "./database";
import { DbUser } from "./db-user";
import * as argon2 from "argon2";
import { userService } from "./user.service";

export function login(req: Request, res: Response) {

  const credentials = req.body;
  const user = db.findUserByEmail(credentials.email);

  if (!user) {
    // send always forbidden
    res.sendStatus(403);
    return;
  } else {
    attemptLogin(res, credentials, user).then(() => {
    }).catch(() => {
      console.log("Login failed for user", user.email);
      res.sendStatus(403);
    });
  }
}

async function attemptLogin(res: Response, credentials: any, user: DbUser) {

  const isPasswordValid = argon2.verify(user.passwordDigest, credentials.password);

  if (!isPasswordValid) {
    throw new Error("Password incorrect");
  }

  userService.createSessionAndBuildResponse(res, user);

  console.log("Login sucessful for user", user.email);
}


