import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import HomePage from "../components/HomePage/HomePage";
import DashboardPage from "../components/DashboardPage/DashboardPage";
import CreatePage from "../components/CreatePage/CreatePage";
import EditPage from "../components/EditPage/EditPage";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/create" component={CreatePage} />
        <Route path="/edit" component={EditPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
