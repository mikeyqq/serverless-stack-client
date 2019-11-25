import React, { useState } from "react";
import { useFormFields } from "../../libs/hooksLib";
import RequestCodeForm from "./RequestCodeForm/RequestCodeForm";
import ConfirmationForm from "./ConfirmationForm/ConfirmationForm";
import SuccessMessage from "./SuccessMessage/SuccessMessage";

import { Auth } from "aws-amplify";
import "./ResetPasswordPage.scss";

const ResetPasswordPage = () => {
  const [fields, handleFieldChange] = useFormFields({
    code: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validateCodeForm() {
    return fields.email.length > 0;
  }

  function validateResetForm() {
    return fields.code.length > 0 && fields.password.length > 0 && fields.password === fields.confirmPassword;
  }

  const handleSendCodeClick = async event => {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      await Auth.forgotPassword(fields.email);
      setCodeSent(true);
    } catch (e) {
      alert(e.message);
      setIsSendingCode(false);
    }
  };

  const handleConfirmClick = async event => {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.forgotPasswordSubmit(fields.email, fields.code, fields.password);
      setConfirmed(true);
    } catch (e) {
      alert(e.message);
      setIsConfirming(false);
    }
  };

  return (
    <div className="ResetPassword">
      {!codeSent ? (
        <RequestCodeForm
          handleSendCodeClick={handleSendCodeClick}
          fields={fields}
          handleFieldChange={handleFieldChange}
          isSendingCode={isSendingCode}
          validateCodeForm={validateCodeForm}
        />
      ) : !confirmed ? (
        <ConfirmationForm
          handleConfirmClick={handleConfirmClick}
          fields={fields}
          handleFieldChange={handleFieldChange}
          isConfirming={isConfirming}
          validateResetForm={validateResetForm}
        />
      ) : (
        <SuccessMessage />
      )}
    </div>
  );
};

export default ResetPasswordPage;
