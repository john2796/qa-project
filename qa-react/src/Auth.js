import auth0 from "auth0-js";

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      // the following three lines MUST be updated
      domain: "mikko.auth0.com",
      audience: "https://mikko.auth0.com/userinfo",
      clientID: "EF6RU1eoFKB5FSCgKTOwiNfFYoo8TPRA",
      redirectUri: "http://localhost:3000/callback",
      responseType: "token id_token",
      scope: "openid profile"
    });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire tat
        this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        resolve();
      });
    });
  }

  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    //clear id token, profle, and expiration
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
  }
}

const auth0Client = new Auth();

export default auth0Client;

/* 
Summary 
As you can see , in this file, you are creatin a module tha defines theAuth class with seven methods:
1. constructor: here , you create an instance of auth0.WebAuth with your Auth0 values and defines some other important configurations. For example, you are defining that Auth0 wiil redirect users (redirectUri) to the http://localhost:3000/callback URL (the same one you inserted in the Allowed Claback URls field previously)

2. getProfile: This method returns the profiel of the authenticated user, if any .

3. getIdToken: This method returns the id Token generated by Auth0 for the current user. This is what you will use while issuing requests to your POST endpoints.

4. handleAuthentication : this the method that your app will cal right agter tyhe user is redirected from Auth0 . Thi method simply reads the hash segment of the URL to fetch the user detrails and the id token.

5. isAuthenticated: This method return wheter there is an authenticated user or not .

6. Signin: This method initializes the authentifcation process. In other words , this metohd sends your users to the Auth0 login page.

7.signOut: This method signs a user out by setting the profile, id_token, and expirsAt to null



*/
