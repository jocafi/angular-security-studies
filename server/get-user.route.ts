import { Request, Response } from "express";
import { sessionStore } from "./session-store";

export function getUser(req: Request, res: Response) {

  const sessionId = req.cookies["SESSIONID"];

  if (sessionId) {
    const user = sessionStore.findUserBySessionId(sessionId);
    res.status(200).json(user);
  } else {
    console.log("Session not found: ", sessionId);
    // NO CONTENT  (found in the server)
    res.sendStatus(204);
  }

}
