import * as _ from "lodash";
import { LESSONS, USERS } from "./database-data";
import { DbUser } from "./db-user";
import * as argon2 from "argon2";

class InMemoryDatabase {

  userCounter = 0;

  readAllLessons() {
    return _.values(LESSONS);
  }

  validateUser(email: string) {
    const usersPerEmail = _.keyBy(_.values(USERS), "email");

    if (usersPerEmail[email]) {
      const message = "An user already exists with email " + email;
      console.error(message);
      throw new Error(message);
    }
  }

  async createUser(email: string, password: string): Promise<DbUser> {

    const id = ++this.userCounter;

    try {
      return await argon2.hash(password).then(passwordDigest => {
        const user: DbUser = {
          id,
          email,
          passwordDigest
        };

        USERS[id] = user;

        return user;
      }).catch(this.errorOnHash);
    } catch (reason) {
      this.errorOnHash(reason);
    }
  }

  errorOnHash(reason) {
    console.error("Error generating password hash: " + reason);
    return null;
  }

  findUserByEmail(email: string): DbUser {

    const users = _.values(USERS);

    return _.find(users, user => user.email === email);
  }


  findUserById(userId: string): DbUser {

    let user;

    if (userId) {

      console.log("looking for userId ", userId);

      const users = _.values(USERS);

      user = _.find(users, user1 => user1.id.toString() === userId);

      console.log("user data found:", user);
    }

    return user;

  }
}

export const db = new InMemoryDatabase();
