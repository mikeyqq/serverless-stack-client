import React, { useState } from "react";
import "./LoginPage.scss";

import { Auth } from "aws-amplify";

const LoginPage = props => {
  console.log("this is your props in login page", props);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validationForm() {
    return email.length > 0 && password.length > 0;
  }

  async function formOnSubmitHandler(e) {
    e.preventDefault();
    try {
      await Auth.signIn(email, password);
      props.userHasAuthenticated(true);
      props.history.push("/dashboard");
    } catch (e) {
      alert(e.message);
    }
  }

  function emailChangeHandler(e) {
    setEmail(e.target.value);
  }
  function passwordChangeHandler(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="loginContainer">
      <form onSubmit={formOnSubmitHandler} className="loginForm">
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          value={email}
          onChange={emailChangeHandler}
          className="form-input-1"
          autoFocus={true}
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={password}
          onChange={passwordChangeHandler}
          className="form-input-1"
        />
        <button disabled={!validationForm()} className="form-button ">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
