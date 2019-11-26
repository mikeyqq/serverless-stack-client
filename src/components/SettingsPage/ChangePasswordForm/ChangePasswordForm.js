import React, { useState } from "react";
import LoaderButton from "../../UI/LoaderButton";
import { useFormFields } from "../../../libs/hooksLib";
import "./ChangePasswordForm.scss";

import { Auth } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const ChangePasswordForm = props => {
  const [fields, handleFieldChange] = useFormFields({
    password: "",
    oldPassword: "",
    confirmPassword: ""
  });

  const [isChanging, setIsChanging] = useState(false);

  function validateForm() {
    return fields.oldPassword.length > 0 && fields.password.length > 0 && fields.password === fields.confirmPassword;
  }

  const handleChangePassword = async event => {
    event.preventDefault();

    setIsChanging(true);

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(currentUser, fields.oldPassword, fields.password);

      props.history.push("/settings");
    } catch (e) {
      alert(e.message);
      setIsChanging(false);
    }
  };

  return (
    <div className="ChangePassword">
      <form onSubmit={handleChangePassword}>
        <FormGroup bsSize="large" controlId="oldPassword">
          <ControlLabel>Old Password</ControlLabel>
          <FormControl type="password" onChange={handleFieldChange} value={fields.oldPassword} />
        </FormGroup>
        <hr />
        <FormGroup bsSize="large" controlId="password">
          <ControlLabel>New Password</ControlLabel>
          <FormControl type="password" value={fields.password} onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup bsSize="large" controlId="confirmPassword">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl type="password" onChange={handleFieldChange} value={fields.confirmPassword} />
        </FormGroup>
        <LoaderButton block type="submit" bsSize="large" disabled={!validateForm()} isLoading={isChanging}>
          Change Password
        </LoaderButton>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
