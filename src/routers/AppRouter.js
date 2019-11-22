import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import AppliedRoute from "./AppliedRoute";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

import NavigationBar from "../components/NavigationBar/NavigationBar";
import HomePage from "../components/HomePage/HomePage";
import CreatePage from "../components/CreatePage/CreatePage";
import EditNotePage from "../components/EditNotePage/EditNotePage";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import LoginPage from "../components/LoginPage/LoginPage";
import SignupPage from "../components/SignupPage/SignupPage";

export const history = createHistory();

const AppRouter = ({ appProps, handleLogout }) => {
  return (
    <Router history={history}>
      <NavigationBar appProps={appProps} handleLogout={handleLogout} />
      <Switch>
        <AppliedRoute path="/" component={HomePage} exact={true} appProps={appProps} />
        <UnauthenticatedRoute path="/login" component={LoginPage} appProps={appProps} />
        <UnauthenticatedRoute path="/signup" component={SignupPage} appProps={appProps} />
        <AuthenticatedRoute path="/notes/create" component={CreatePage} appProps={appProps} />
        <AuthenticatedRoute path="/notes/:id" component={EditNotePage} appProps={appProps} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
