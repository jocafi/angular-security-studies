import { db } from "./database";
import { sessionStore } from "./session-store";


export function readAllLessons(req, res) {
  const sessionId = req.cookies["SESSIONID"];

  const isSessionValid = sessionStore.isSessionValid(sessionId);

  if (!isSessionValid) {
    console.log("Session invalid: ", sessionId);
    res.sendStatus(403);
  } else {
    return res.status(200).json({ lessons: db.readAllLessons() });
  }

}
