import React from "react";
import LoaderButton from "../../../UI/LoaderButton";

import { FormGroup, FormControl, ControlLabel, HelpBlock } from "react-bootstrap";

export function ConfirmationForm(props) {
  function validateConfirmationCode() {
    return props.fields.code > 0;
  }

  return (
    <form onSubmit={props.onSubmit}>
      <FormGroup bsSize="large" controlId="code">
        <ControlLabel>Confirmation Code</ControlLabel>
        <FormControl autoFocus type="tel" value={props.fields.code} onChange={props.handleFieldChange} />
        <HelpBlock>Please check your email ({props.fields.email}) for the confirmation code.</HelpBlock>
      </FormGroup>
      <LoaderButton
        block
        type="submit"
        bsSize="large"
        isLoading={props.isConfirming}
        disabled={validateConfirmationCode}
      >
        Confirm
      </LoaderButton>
    </form>
  );
}
