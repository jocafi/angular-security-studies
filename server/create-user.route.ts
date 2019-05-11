import {Request, Response} from "express";
import {db} from "./database";
import {USERS} from "./database-data";
import {validatePassword} from "./password-validation";


export function createUser(req: Request, res: Response) {

  const credentials = req.body;

  const errors = validatePassword(credentials.password);

  if (errors.length > 0) {
    res.status(400).json({errors});
  } else {

    try {
      db.validateUser(credentials.email);
    } catch (reason) {
      const errors1 = ["already_exist"];
      res.status(400).json({ errors: errors1 });
      return;
    }

    db.createUser(credentials.email, credentials.password).then(user => {

      console.log("New User created on memory:", user);

      if (!user) {
        const errMesg = "The user could not be created";
        console.log(errMesg);
        res.status(500).json({ errors: errMesg });
      }

      console.log(USERS);

      res.status(200).json({ id: user.id, email: user.email });
    });
  }

}
