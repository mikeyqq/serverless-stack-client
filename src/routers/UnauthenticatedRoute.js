import React from "react";
import { Route, Redirect } from "react-router-dom";

//window.location.href provides the url to our function.
//Will return the url to redirect after authentication.
function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//function takes in multiple component routes from AppRouter
//!isAuthentication is true, then route will render out login component
export default function UnauthenticatedRoute({ component: C, appProps, ...rest }) {
  const redirect = querystring("redirect");
  return (
    <Route
      {...rest}
      render={props =>
        !appProps.isAuthenticated ? (
          <C {...props} {...appProps} />
        ) : (
          <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
        )
      }
    />
  );
}
