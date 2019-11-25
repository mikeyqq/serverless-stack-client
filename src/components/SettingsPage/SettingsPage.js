import React from "react";
import LoaderButton from "../UI/LoaderButton";
import "./SettingsPage.scss";

import { LinkContainer } from "react-router-bootstrap";

const SettingsPage = () => (
  <div className="Settings">
    <LinkContainer to="/settings/email">
      <LoaderButton block bsSize="large">
        Change Email
      </LoaderButton>
    </LinkContainer>
    <LinkContainer to="/settings/password">
      <LoaderButton block bsSize="large">
        Change Password
      </LoaderButton>
    </LinkContainer>
  </div>
);

export default SettingsPage;
