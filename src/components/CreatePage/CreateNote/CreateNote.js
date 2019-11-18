import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import config from "../../../config";
import LoaderButton from "../../UI/LoaderButton";
import { useFormFields } from "../../../libs/hooksLib";
import "./CreateNote.scss";

const CreateNote = () => {
  const file = useRef(null);
  const [fields, handleFieldChange] = useFormFields({
    title: "",
    description: "",
    priority: 0,
    date: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  function validationForm() {
    return fields.title.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
      return;
    }

    setIsLoading(true);
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="title">
          <ControlLabel>Title</ControlLabel>
          <FormControl value={fields.title} type="text" onChange={handleFieldChange} autoFocus />
        </FormGroup>
        <FormGroup controlId="description">
          <ControlLabel>Description</ControlLabel>
          <FormControl value={fields.description} componentClass="textarea" onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup controlId="priority">
          <ControlLabel>Priority</ControlLabel>
          <FormControl value={fields.priority} type="text" onChange={handleFieldChange} />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>File Attachment</ControlLabel>
          <FormControl onChange={handleFileChange} type="file" />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isLoading}
          disabled={!validationForm()}
        >
          Create
        </LoaderButton>
      </form>
    </div>
  );
};

export default CreateNote;
