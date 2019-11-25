import React, { useState } from "react";
import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useFormFields } from "../../libs/hooksLib";
import "./SignupPage.scss";
import LoaderButton from "../UI/LoaderButton";

//This allows our client to speak to aws services
import { Auth } from "aws-amplify";
import { history } from "../../routers/AppRouter";

const SignupPage = props => {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: ""
  });

  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0 && fields.password === fields.confirmPassword;
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  //handles user signup with auth.signup
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
      if (e.message === "An account with the given email already exists.") {
        history.push("/login");
      }
    }
    setIsLoading(false);
  }

  //handles the confirmation code with auth.confirmsignup
  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  //if a newUser is truthy and new user did sign up yet, this will render.
  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl autoFocus type="tel" onChange={handleFieldChange} value={fields.confirmationCode} />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton block type="submit" bsSize="large" isLoading={isLoading} disabled={!validateConfirmationForm()}>
          Verify
        </LoaderButton>
      </form>
    );
  }

  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl autoFocus type="email" value={fields.email} onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password" value={fields.password} onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl type="password" onChange={handleFieldChange} value={fields.confirmPassword} />
        </FormGroup>
        <LoaderButton block type="submit" bsSize="large" isLoading={isLoading} disabled={!validateForm()}>
          Signup
        </LoaderButton>
      </form>
    );
  }

  return <div className="Signup">{newUser === null ? renderForm() : renderConfirmationForm()}</div>;
};

export default SignupPage;
