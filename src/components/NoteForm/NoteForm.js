import React, { useRef, useState } from "react";
import config from "../../config";
import LoaderButton from "../UI/LoaderButton";
import "./NoteForm.scss";

import { history } from "../../routers/AppRouter";
import { s3Upload } from "../../libs/awsLib";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const NoteForm = () => {
  const file = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  function validationForm() {
    return title.length > 0 && content.length > 0 && priority.length > 0;
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
    try {
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createNote({ title, content, priority, attachment });
      history.push("/");
    } catch (e) {
      console.log("this is your error for the s3upload", e);
      alert(e);
      setIsLoading(false);
    }
  }

  function createNote(note) {
    return API.post("notes", "/notes", {
      body: note
    });
  }

  return (
    <div className="NewNote">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="title">
          <ControlLabel>Title</ControlLabel>
          <FormControl value={title} type="text" onChange={e => setTitle(e.target.value)} autoFocus />
        </FormGroup>
        <FormGroup controlId="description">
          <ControlLabel>Content</ControlLabel>
          <FormControl value={content} componentClass="textarea" onChange={e => setContent(e.target.value)} />
        </FormGroup>
        <FormGroup controlId="priority">
          <ControlLabel>Priority</ControlLabel>
          <FormControl value={priority} type="text" onChange={e => setPriority(e.target.value)} />
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
          Submit
        </LoaderButton>
      </form>
    </div>
  );
};

export default NoteForm;
