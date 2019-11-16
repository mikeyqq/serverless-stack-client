import React, { useState, useEffect } from "react";
import AppRouter from "./routers/AppRouter";
import { Auth } from "aws-amplify";
import { history } from "../src/routers/AppRouter";

function App() {
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut().then(() => {
      console.log("logged out");
      userHasAuthenticated(false);
      history.push("/login");
    });
  }

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  return (
    <AppRouter appProps={{ isAuthenticated, userHasAuthenticated, isAuthenticating }} handleLogout={handleLogout} />
  );
}

export default App;
