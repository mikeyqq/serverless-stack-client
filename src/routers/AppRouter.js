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
import ResetPasswordPage from "../components/ResetPasswordPage/ResetPasswordPage";
import SettingsPage from "../components/SettingsPage/SettingsPage";
import ChangePasswordForm from "../components/SettingsPage/ChangePasswordForm/ChangePasswordForm";
import ChangeEmailForm from "../components/SettingsPage/ChangeEmailForm/ChangeEmailForm";

export const history = createHistory();

const AppRouter = ({ appProps, handleLogout }) => {
  return (
    <Router history={history}>
      <NavigationBar appProps={appProps} handleLogout={handleLogout} />
      <Switch>
        <AppliedRoute path="/" component={HomePage} exact appProps={appProps} />
        <UnauthenticatedRoute path="/login/reset" exact component={ResetPasswordPage} appProps={appProps} />
        <UnauthenticatedRoute exact component={LoginPage} path="/login" appProps={appProps} />
        <UnauthenticatedRoute exact component={SignupPage} path="/signup" appProps={appProps} />
        <AuthenticatedRoute exact component={SettingsPage} path="/settings" appProps={appProps} />
        <AuthenticatedRoute exact component={ChangePasswordForm} path="/settings/password" appProps={appProps} />
        <AuthenticatedRoute exact component={ChangeEmailForm} path="/settings/email" appProps={appProps} />
        <AuthenticatedRoute exact component={CreatePage} path="/notes/create" appProps={appProps} />
        <AuthenticatedRoute component={EditNotePage} path="/notes/:id" appProps={appProps} />

        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
