import React from "react";
import LoaderButton from "../../../UI/LoaderButton";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export function EmailUpdateForm(props) {
  function validateEmailForm() {
    return props.fields.email.length > 0;
  }
  return (
    <form onSubmit={props.onSubmit}>
      <FormGroup bsSize="large" controlId="email">
        <ControlLabel>New Email</ControlLabel>
        <FormControl autoFocus value={props.fields.email} onChange={props.handleFieldChange} />
      </FormGroup>
      <LoaderButton block type="submit" bsSize="large" disabled={!validateEmailForm()} isLoading={props.isSendingCode}>
        Update Email
      </LoaderButton>
    </form>
  );
}
