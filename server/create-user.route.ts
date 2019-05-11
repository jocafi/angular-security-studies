



import {Request, Response} from "express";
import {db} from "./database";
import {USERS} from "./database-data";



export function createUser(req: Request, res: Response) {

    const credentials = req.body;

    db.createUser(credentials.email, credentials.password).then( user => {

      console.log("New User created on memory:", user);

      if (!user) {
        const errMesg = "The user could not be created";
        console.log(errMesg);
        res.status(500).json({error: errMesg});
      }

      console.log(USERS);

      res.status(200).json({id: user.id, email: user.email});
    });

}
