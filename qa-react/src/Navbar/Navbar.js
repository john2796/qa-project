import React from "react";
import { Link, withRouter } from "react-router-dom";
import auth0Client from "../Auth";

const Navbar = props => {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace("/");
  };

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand " to="/">
        Q&App
      </Link>
      {!auth0Client.isAuthenticated() && (
        <button className="btn btn-dark" onClick={auth0Client.signIn}>
          Sign In
        </button>
      )}
      {auth0Client.isAuthenticated() && (
        <div>
          <label className="mr-2 text-white">
            {auth0Client.getProfile().name}
          </label>
          <button
            className="btn btn-dark"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default withRouter(Navbar);

/* 
Sumamry 
The new version of your navigation imports two new elements: 

- withRouter: This is a compnent provided by React Router to enhance tour compnent with navigation capabilities (e.g , access to the history object).

- auth0Client : This is the singleton instance of the Auth class you just defined 


* With the auth0Client instance , the NavBar decdieds if it must render a Sign in button ( which it does for unauthenticated users ) pr a Sign out Button (for authenticated users ). If the user is properly authenticated, this component alsow shos its name. And ifan authenticated user hist the Sign Out button, your ocmpnent calls the signOut method of auth0Client and redirects the user  to the home page .

* After refractoring the Navbar component, you will have to craete a component to hand the callback route (http://loaclhost:3000/callback). to define this compnent, create a new file caleed callback.hs inside the src director and insert the following code into it

*/
