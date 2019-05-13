import { filter } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../model/user";
import * as auth0 from "auth0-js";
import { Router } from "@angular/router";
import moment = require("moment");

export const ANONYMOUS_USER: User = {
  id: undefined,
  email: ""
};

const AUTH_CONFIG = {
  clientID: "fyb7ToWjlcaFfzN73oV6R3mxzlkmPtJx",
  domain: "angular-securities.eu.auth0.com"
};


@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: "token id_token",
    redirectUri: "https://localhost:4200/lessons"
  });

  constructor(private http: HttpClient, private router: Router) {

  }

  login() {
    this.auth0.authorize();

  }

  signUp() {

  }

  retrieveAuthInfoFromUrl() {

    this.auth0.parseHash((err, authResult) => {

      if (err) {
        console.log("Could not parse the hash.");
        return;
      } else if (authResult && authResult.idToken) {

        // the command below would retrieve much more user information
        // this.auth0.client.userInfo(authResult.accesssToken, (err, userProfile) => {});

        // Clear the hash string showed in the url of the browser
        window.location.hash = "";
        console.log("Authentication successful, authResult: ", authResult);
        this.setSession(authResult);
      }
    });
  }

  logout() {
    localStorage.removeItem("idToken");
    localStorage.removeItem("expires_at");
    this.router.navigate(["/lessons"]);
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  private setSession(authResult: any) {

    const expiresAt = moment().add(authResult.expiresIn, "second");

    localStorage.setItem("idToken", authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }
}







