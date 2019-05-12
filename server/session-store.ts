import { Session } from "./session";
import { User } from "../src/app/model/user";
import { randomBytes } from "crypto";


class SessionStore {

  private sessions: { [key: string]: Session } = {};

  createSession(user: User): Session {
    const sessionId = randomBytes(32).toString("hex"); //  .then(bytes => bytes.toString("hex"));
    const newSession = new Session(sessionId, user);
    this.sessions[sessionId] = newSession;
    return newSession;
  }

  findUserBySessionId(sessionId: string) {
    const session = this.sessions[sessionId];

    const isSessionValid = session && session.isValid();

    return isSessionValid ? session.user : null;
  }

  isSessionValid(sessionId: string): boolean {
    const session = this.sessions[sessionId];
    const isSessionValid = session && session.isValid();
    return isSessionValid;
  }

  destroySession(sessionId: string) {
      delete this.sessions[sessionId];
  }
}

// Singleton
export const sessionStore = new SessionStore();
