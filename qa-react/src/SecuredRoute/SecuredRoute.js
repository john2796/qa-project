import React from "react";
import { Route } from "react-router-dom";
import auth0Client from "../Auth";

function SecuredRoute(props) {
  const { component: Component, path } = props;
  return (
    <Route
      path={path}
      render={() => {
        if (!auth0Client.isAuthenticated()) {
          auth0Client.signIn();
          return <div />;
        }
        return <Component />;
      }}
    />
  );
}

export default SecuredRoute;

/* 
Sumamry 
- The goal oif this component is to restrict access to whatever route you configure on it. The implementation of this is quite simple. In this case, you are createing a functional component that takes two properties : anotehr Component , so it can render it in case the user is authenticated; and a path, so it can configure the default Route component provided by React Router. However , before rendering anything, this component checks if the user isAuthenticated. If they are not, this compnent triggers the sighIn method to redirectg users to  the login page. 

- Then ,after createing the SecuredRoute compnent , you can create the component that will render  the form where users will create question . For that create a new directory called NewQuestion and a file called NewQuestion.js inside it . Then , insert this code in the file:

*/
