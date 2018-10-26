import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import auth0Client from "./Auth";
import Spinner from "./Spinner";

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.props.history.replace("/");
  }

  render() {
    return <Spinner />;
  }
}

export default withRouter(Callback);

/* 
Summary 
 = Them compnent you just defined is responsible for two things. 
 =First , it calls the handleAuthentication method to fetch the user infrormation sent by Auth0.

 =Second, it redirects your users to the home page ( history.replace('/')) after it finishes the handAuthentication process. In the meantime, this component shows the following message: "Loading Profile || or Spinner " .

 =Then , to wrap the integration with Auth0 , you will have to open the app.js and upate it as follows;



*/
