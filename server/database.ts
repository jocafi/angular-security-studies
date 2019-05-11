
import * as _ from "lodash";
import {LESSONS, USERS} from "./database-data";
import {DbUser} from "./db-user";
import * as argon2 from "argon2";

class InMemoryDatabase {

    userCounter = 0;

    readAllLessons() {
        return _.values(LESSONS);
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
          }).catch(reason => {
            console.error("Error generating password hash: " + reason);
            return null;
          });
        } catch (reason) {
          console.error("Error generating password hash: " + reason);
          return null;
        }
    }

}

export const db = new InMemoryDatabase();
