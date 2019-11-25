import React from "react";
import { HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../UI/LoaderButton";

const ConfirmationForm = props => {
  return (
    <form onSubmit={props.handleConfirmClick}>
      <FormGroup bsSize="large" controlId="code">
        <ControlLabel>Confirmation Code</ControlLabel>
        <FormControl autoFocus type="tel" value={props.fields.code} onChange={props.handleFieldChange} />
        <HelpBlock>Please check your email ({props.fields.email}) for the confirmation code.</HelpBlock>
      </FormGroup>
      <hr />
      <FormGroup bsSize="large" controlId="password">
        <ControlLabel>New Password</ControlLabel>
        <FormControl type="password" value={props.fields.password} onChange={props.handleFieldChange} />
      </FormGroup>
      <FormGroup bsSize="large" controlId="confirmPassword">
        <ControlLabel>Confirm Password</ControlLabel>
        <FormControl type="password" onChange={props.handleFieldChange} value={props.fields.confirmPassword} />
      </FormGroup>
      <LoaderButton
        block
        type="submit"
        bsSize="large"
        isLoading={props.isConfirming}
        disabled={!props.validateResetForm()}
      >
        Confirm
      </LoaderButton>
    </form>
  );
};

export default ConfirmationForm;
