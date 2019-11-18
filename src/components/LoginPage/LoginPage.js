import React, { useState } from "react";
import "./LoginPage.scss";
import { useFormFields } from "../../libs/hooksLib";
import LoaderButton from "../UI/LoaderButton";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { Auth } from "aws-amplify";

const LoginPage = props => {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: ""
  });

  //initiates feedback for a loader when logging in
  const [isLoading, setIsLoading] = useState(false);

  function validationForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function formOnSubmitHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);
      props.history.push("/dashboard");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={formOnSubmitHandler}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl autoFocus type="email" value={fields.email} onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl value={fields.password} onChange={handleFieldChange} type="password" />
        </FormGroup>
        <LoaderButton block bsSize="large" disabled={!validationForm()} type="submit" isLoading={isLoading}>
          Login
        </LoaderButton>
      </form>
    </div>
  );
};

export default LoginPage;
