import React, { useState, useEffect, useRef } from "react";
import LoaderButton from "../UI/LoaderButton";
import config from "../../config";
import "./EditNotePage.scss";

import { API, Storage } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";

import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const EditNotePage = props => {
  console.log("this is props from editnotepage", props);
  const file = useRef(null);
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadNote() {
      return API.get("notes", `/notes/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const note = await loadNote();

        const { content, priority, attachment, title } = note;
        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }
        setTitle(title);
        setContent(content);
        setPriority(priority);
        setNote(note);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return content.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function saveNote(note) {
    return API.put("/notes", `/notes/${props.match.params.id}`, { body: note });
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
      return;
    }

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      await saveNote({
        title,
        content,
        priority,
        attachment: attachment || note.attachment
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm("Are you sure you want to delete this note?");

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
  }

  return (
    <div className="Notes">
      {note && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="title">
            <ControlLabel>Title</ControlLabel>
            <FormControl value={title} componentClass="input" onChange={e => setTitle(e.target.value)} />
          </FormGroup>
          <FormGroup controlId="content">
            <ControlLabel>Content</ControlLabel>
            <FormControl value={content} componentClass="textarea" onChange={e => setContent(e.target.value)} />
          </FormGroup>
          <FormGroup controlId="priorty">
            <ControlLabel>Priority</ControlLabel>
            <FormControl value={priority} componentClass="input" onChange={e => setPriority(e.target.value)} />
          </FormGroup>
          {note.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a target="_blank" rel="noopener noreferrer" href={note.attachmentURL}>
                  {formatFilename(note.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!note.attachment && <ControlLabel>Attachment</ControlLabel>}
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton block bsSize="large" bsStyle="danger" onClick={handleDelete} isLoading={isDeleting}>
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
};

export default EditNotePage;
