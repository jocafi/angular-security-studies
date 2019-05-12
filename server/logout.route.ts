import { Request, Response } from "express";
import { sessionStore } from "./session-store";

export function logout(req: Request, res: Response) {

  const sessionId = req.cookies["SESSIONID"];

  if (sessionId) {
    console.log("Session removed: ", sessionId);

    sessionStore.destroySession(sessionId);
    res.clearCookie("SESSIONID");
    res.status(200).json({message: "Logout Successful"});
  } else {
    console.log("Session not found: ", sessionId);
    // NO CONTENT  (found in the server)
    res.sendStatus(204);
  }
}
