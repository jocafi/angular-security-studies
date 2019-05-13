import { Request, Response } from "express";
import { sessionStore } from "./session-store";
import { db } from "./database";

export function getUser(req: Request, res: Response) {

  const user = db.findUserById(req["userId"])

  if (user) {
    res.status(200).json({email: user.email, id: user.id});
  } else {
    console.log("user id not found: ", req["userId"]);
    // NO CONTENT  (found in the server)
    res.sendStatus(204);
  }

}
