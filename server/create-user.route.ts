import { Request, Response } from "express";
import { db } from "./database";
import { validatePassword } from "./password-validation";
import { userService } from "./user.service";


export function createUser(req: Request, res: Response) {

  const credentials = req.body;

  const errors = validatePassword(credentials.password);

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {

    try {
      db.validateUser(credentials.email);
    } catch (reason) {
      const errors1 = ["already_exist"];
      res.status(400).json({ errors: errors1 });
      return;
    }

    createUserAndSession(res, credentials)
      .catch(() => res.sendStatus(500));
  }

}


export async function createUserAndSession(res: Response, credentials) {
  db.createUser(credentials.email, credentials.password).then(user => {

    console.log("New User created on memory:", user);

    if (!user) {
      const errMesg = "The user could not be created";
      console.log(errMesg);
      res.status(500).json({ errors: errMesg });
    }

    userService.createSessionTokenAndBuildResponse(res, user);

  });
}
