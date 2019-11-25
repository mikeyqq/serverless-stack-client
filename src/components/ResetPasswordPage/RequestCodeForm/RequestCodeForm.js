import React from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../UI/LoaderButton";

const RequestCodeForm = props => {
  return (
    <form onSubmit={props.handleSendCodeClick}>
      <FormGroup bsSize="large" controlId="email">
        <ControlLabel>Email</ControlLabel>
        <FormControl autoFocus type="email" value={props.fields.email} onChange={props.handleFieldChange} />
      </FormGroup>
      <LoaderButton
        block
        type="submit"
        bsSize="large"
        isLoading={props.isSendingCode}
        disabled={!props.validateCodeForm()}
      >
        Send Confirmation
      </LoaderButton>
    </form>
  );
};

export default RequestCodeForm;
