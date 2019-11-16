import React, { useState } from "react";
import "./LoginPage.scss";
import Spinner from "../../assets/images/spinner.gif";
import { useFormFields } from "../../libs/hooksLib";

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

  let button;

  //conditional statement to return loading spinner based on true/false of loading upon click
  if (isLoading) {
    button = (
      <button disabled={!validationForm()} className="form-button ">
        <img src={Spinner} alt="spinner" className="spinner-Img" />
        <span>Login</span>
      </button>
    );
  } else {
    button = (
      <button disabled={!validationForm()} className="form-button ">
        <span>Login</span>
      </button>
    );
  }

  return (
    <div className="loginContainer">
      <form onSubmit={formOnSubmitHandler} className="loginForm">
        <label className="loginForm-label">Email</label>
        <input
          id="email"
          type="text"
          placeholder="Enter Email"
          value={fields.email}
          onChange={handleFieldChange}
          className="form-input-1"
          autoFocus={true}
        />
        <label className="loginForm-label">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          value={fields.password}
          onChange={handleFieldChange}
          className="form-input-1"
        />
        {button}
      </form>
    </div>
  );
};

export default LoginPage;
