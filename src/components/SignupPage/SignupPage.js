import React, { useState } from "react";
import Spinner from "../../assets/images/spinner.gif";
import { useFormFields } from "../../libs/hooksLib";
import "./SignupPage.scss";

//This allows our client to speak to aws services
import { Auth } from "aws-amplify";

const SignupPage = props => {
  console.log("this is props in the signuppage", props);
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

  async function handleSubmit(event) {
    event.preventDefault();
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
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      props.userHasAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setIsLoading(false);
    }
  }

  //if a newUser is truthy and new user did sign up yet, this will render.
  function renderConfirmationForm() {
    //conditional statement to return loading spinner based on true/false of isLoading upon click
    let button;
    if (isLoading) {
      button = (
        <button disabled={!validateConfirmationForm()} className="form-button ">
          <img src={Spinner} alt="spinner" className="spinner-Img" />
          <span>Verifying</span>
        </button>
      );
    } else {
      button = (
        <button disabled={!validateConfirmationForm()} className="form-button ">
          <span>Verify</span>
        </button>
      );
    }
    return (
      <div className="signupContainer">
        <form onSubmit={handleConfirmationSubmit} className="signupForm">
          <label className="signupForm-label">Confirmation Code</label>
          <input
            id="confirmationCode"
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
            autoFocus
            className="form-input-1"
          />
          <span>Please check your email for verification code.</span>
          {button}
        </form>
      </div>
    );
  }

  //if a newUser is falsy and new user did not sign up yet, this will render.
  function renderForm() {
    //conditional statement to return loading spinner based on true/false of isLoading upon click
    let button;
    if (isLoading) {
      button = (
        <button disabled={!validateForm()} className="form-button ">
          <img src={Spinner} alt="spinner" className="spinner-Img" />
          <span>Submit</span>
        </button>
      );
    } else {
      button = (
        <button disabled={!validateForm()} className="form-button ">
          <span>Submit</span>
        </button>
      );
    }
    return (
      <div className="signupContainer">
        <form onSubmit={handleSubmit} className="signupForm">
          <label className="signupForm-label">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Enter Email"
            value={fields.email}
            onChange={handleFieldChange}
            className="form-input-1"
            autoFocus={true}
          />
          <label className="signupForm-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={fields.password}
            onChange={handleFieldChange}
            className="form-input-1"
          />
          <label className="signupForm-label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={fields.confirmPassword}
            onChange={handleFieldChange}
            className="form-input-1"
          />
          {button}
        </form>
      </div>
    );
  }

  return <div>{newUser === null ? renderForm() : renderConfirmationForm()}</div>;
};

export default SignupPage;
