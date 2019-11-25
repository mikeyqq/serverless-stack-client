import React, { useState } from "react";
import { useFormFields } from "../../../libs/hooksLib";
import { EmailUpdateForm } from "./EmailUpdateForm/EmailUpdateForm";
import { ConfirmationForm } from "./ConfirmationForm/ConfirmationForm";
import "./ChangeEmailForm.scss";

import { Auth } from "aws-amplify";

const ChangeEmailForm = props => {
  const [fields, handleFieldChange] = useFormFields({
    code: "",
    email: ""
  });

  const [codeSent, setCodeSent] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const handleUpdateClick = async event => {
    event.preventDefault();
    setIsSendingCode(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: fields.email });
      setCodeSent(true);
    } catch (e) {
      alert(e);
      setIsSendingCode(false);
    }
  };

  const handleConfirmClick = async event => {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", fields.code);

      props.history.push("/settings");
    } catch (e) {
      alert(e.message);
      setIsConfirming(false);
    }
  };

  return (
    <div className="ChangeEmail">
      {!codeSent ? (
        <EmailUpdateForm
          onSubmit={handleUpdateClick}
          fields={fields}
          handleFieldChange={handleFieldChange}
          isSendingCode={isSendingCode}
        />
      ) : (
        <ConfirmationForm
          onSubmit={handleConfirmClick}
          fields={fields}
          handleFieldChange={handleFieldChange}
          isConfirming={isConfirming}
        />
      )}
    </div>
  );
};

export default ChangeEmailForm;
