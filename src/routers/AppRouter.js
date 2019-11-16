import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import Navbar from "../components/Navbar/Navbar";
import HomePage from "../components/HomePage/HomePage";
import DashboardPage from "../components/DashboardPage/DashboardPage";
import CreatePage from "../components/CreatePage/CreatePage";
import EditPage from "../components/EditPage/EditPage";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import LoginPage from "../components/LoginPage/LoginPage";

import AppliedRoute from "./AppliedRoute";

export const history = createHistory();

const AppRouter = ({ appProps, handleLogout }) => {
  return (
    <Router history={history}>
      <Navbar appProps={appProps} handleLogout={handleLogout} />
      <Switch>
        <AppliedRoute path="/" component={HomePage} exact={true} appProps={appProps} />
        <AppliedRoute path="/dashboard" component={DashboardPage} appProps={appProps} />
        <AppliedRoute path="/create" component={CreatePage} appProps={appProps} />
        <AppliedRoute path="/edit" component={EditPage} appProps={appProps} />
        <AppliedRoute path="/login" component={LoginPage} appProps={appProps} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
