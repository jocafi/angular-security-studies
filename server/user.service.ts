import { sessionStore } from "./session-store";
import { DbUser } from "./db-user";
import { Response } from "express";
import { Session } from "./session";


class UserService {

  createSession(user: DbUser): Session {
    const session = sessionStore.createSession(user);
    console.log("New Session ID: ", session.sessionId);
    return session;
  }

  createSessionAndBuildResponse(res: Response, user: DbUser) {
    const session = userService.createSession(user);

    // httpOnly = true avoids that an attacker can set the SESSIONID using the browser console or JS on the browser
    // Ex.: document.cookie="SESSIONID=90def404ef406faaa001737011203512ea744405e2b8e664f97dcbfd07bac207"
    res.cookie("SESSIONID", session.sessionId, { httpOnly: true, secure: true });

    res.status(200).json({ id: user.id, email: user.email });
  }
}

// Singleton
export const userService = new UserService();
