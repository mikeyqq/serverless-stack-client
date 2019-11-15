import React from "react";
import { Link, BrowserRouter, Switch } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import HomePage from "../components/HomePage/HomePage";
import DashboardPage from "../components/DashboardPage/DashboardPage";
import CreatePage from "../components/CreatePage/CreatePage";
import EditPage from "../components/EditPage/EditPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Link path="/" component={HomePage} exact={true} />
        <Link path="/dashboard" component={DashboardPage} />
        <Link path="/create" component={CreatePage} />
        <Link path="/edit" component={EditPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
